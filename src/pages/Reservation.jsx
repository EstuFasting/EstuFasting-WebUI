import React, {useEffect, useState} from 'react';
import CateringService from "../services/cateringService";
import {handleCatch} from "../utilities/utils";
import {Dropdown, Icon, Loader} from "semantic-ui-react";
import {addDays, dateToDateString, getFirstDayOfThisWeek, isInThePast} from "../utilities/dateUtils";
import ReservationCard from "../components/ReservationCard";
import {toast} from "react-toastify";
import {syncUser} from "../store/actions/userActions";
import ReservationService from "../services/reservationService";
import {useDispatch, useSelector} from "react-redux";
import DiningHallService from "../services/diningHallService";
import {syncCaterings} from "../store/actions/cateringActions";
import {syncDiningHalls} from "../store/actions/diningHallActions";

function Reservation() {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user.userProps.user);
    const cateringsRedux = useSelector(state => state?.caterings.cateringProps.caterings);
    const diningHallsRedux = useSelector(state => state?.diningHalls.diningHallProps.diningHalls);

    const reservationService = new ReservationService();

    const [weekLoading, setWeekLoading] = useState(false);
    const [monthLoading, setMonthLoading] = useState(false);
    const [caterings, setCaterings] = useState(cateringsRedux);
    const [diningHalls, setDiningHalls] = useState(diningHallsRedux);
    const [selectedMeal, setSelectedMeal] = useState(2);
    const [dateCateringMap, setDateCateringMap] = useState([]);

    useEffect(() => {
        if (caterings.length > 0) return;
        const cateringService = new CateringService();
        cateringService.getReservationPageData().then(response => {
            setCaterings(response.data.data.content)
            dispatch(syncCaterings(response.data.data.content))
        }).catch(handleCatch)
    }, []);

    useEffect(() => {
        if (diningHalls.length > 0) return;
        const diningHallService = new DiningHallService();
        diningHallService.get().then(response => {
            setDiningHalls(response.data.data.content)
            dispatch(syncDiningHalls(response.data.data.content))
        }).catch(handleCatch)
    }, []);

    const firstDayOfThisWeek = getFirstDayOfThisWeek();

    useEffect(() => {
        const temp = []
        for (let i = 0; i < 28; i++) {
            if (i % 7 >= 5) continue;
            const date = dateToDateString(addDays(firstDayOfThisWeek, i));
            temp.push({
                date: date,
                catering: caterings.find(catering => catering.date === date && catering.meal.id === selectedMeal)
            });
        }
        setDateCateringMap(temp)
    }, [selectedMeal, caterings])

    if (caterings.length === 0 || dateCateringMap.length === 0)
        return (
            <div className="page-loader">
                <Loader content={<div><Icon name="glass martini"/> Menüler getiriliyor...</div>} inline='centered' active size="large"/>
            </div>
        )

    const mealOptions = [
        {key: 2, text: "Öğle Yemeği", value: 2},
        {key: 3, text: "Akşam Yemeği", value: 3}
    ]

    const getReservationModels = (firstWeekDayDate) => {
        const models = [];
        for (let i = -1; i < 4; i++) {
            const catering = dateCateringMap.find(entry => entry.date === dateToDateString(addDays(new Date(firstWeekDayDate), i)))?.catering;
            if (catering === undefined) continue;
            if (user.reservations.find(r => r.catering.id === catering.id) !== undefined || isInThePast(new Date(catering.date)))
                continue;
            models.push({
                cateringId: catering.id,
                customerId: user.id
            })
        }
        return models;
    }

    const makeWeeklyReservation = (firstWeekDayDate) => {
        if (weekLoading) return;
        const models = getReservationModels(firstWeekDayDate)
        if (models.length === 0) {
            toast.warning("Seçilen haftada yapılacak rezervasyon kalmadı");
            return;
        }
        setWeekLoading(true)
        reservationService.makeReservationMultiple({models: models}).then(response => {
            toast.success("Rezervasyon başarılı");
            dispatch(syncUser({...user, reservations: [...user.reservations, ...response.data.data]}))
        }).catch(handleCatch).finally(() => setWeekLoading(false))
    }

    const makeMonthlyReservation = () => {
        if (monthLoading) return;
        const models = [];
        const startDate = addDays(firstDayOfThisWeek, 1);
        for (let i = 0; i < 4; i++)
            models.push(...getReservationModels(addDays(startDate, 7 * i)))
        if (models.length === 0) {
            toast.warning("Bu ayda yapılacak rezervasyon kalmadı");
            return;
        }
        setMonthLoading(true)
        reservationService.makeReservationMultiple({models: models}).then(response => {
            toast.success("Rezervasyon başarılı");
            dispatch(syncUser({...user, reservations: [...user.reservations, ...response.data.data]}))
        }).catch(handleCatch).finally(() => setMonthLoading(false))
    }

    return (
        <div className="reservation-wrapper">
            <div className="d-flex justify-content-between">
                <Dropdown className="reservation-dropdown" selection defaultValue={selectedMeal} options={mealOptions}
                          onChange={(event, data) => setSelectedMeal(data.value)}/>
                <button className="reservation-button" style={{width: "19%"}}
                        onClick={makeMonthlyReservation}>
                    {monthLoading ? <Icon name="circle notch" loading/> : "Tüm Ayı Ekle"}
                </button>
            </div>
            <div className="row row-cols-1 row-cols-md-5 g-3">
                {dateCateringMap.map((entry, index) => {
                    return (
                        <div className="col mb-5" id={String(entry.date)}>
                            {index % 5 === 0 ?
                                <button className="reservation-button"
                                        onClick={() => makeWeeklyReservation(entry.date)}>
                                    {weekLoading ? <Icon name="circle notch" loading/> : "Tüm Haftayı Ekle"}
                                </button> :
                                <button className="reservation-button opacity-0" style={{cursor: "initial"}}></button>
                            }
                            <ReservationCard catering={entry.catering} date={entry.date} diningHalls={diningHalls}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Reservation;