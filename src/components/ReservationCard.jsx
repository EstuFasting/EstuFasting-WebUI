import React, {useState} from 'react';
import {handleCatch} from "../utilities/utils";
import {Dropdown, Icon} from "semantic-ui-react";
import {toast} from "react-toastify";
import {syncUser} from "../store/actions/userActions";
import ReservationService from "../services/reservationService";
import {useDispatch, useSelector} from "react-redux";
import DisabledReservationCard from "./DisabledReservationCard";
import {isInThePast} from "../utilities/dateUtils";

function ReservationCard({catering, date, diningHalls}) {

    const [loading, setLoading] = useState(false);
    const reservationService = new ReservationService();
    const user = useSelector(state => state?.user.userProps.user);
    const dispatch = useDispatch();

    const diningHallOptions = diningHalls.map(diningHall => ({
        key: diningHall.id,
        text: diningHall.description.replace("Dining Hall", "Yemekhanesi").replace("Student", "Öğrenci").replace("Personnel", "Personel"),
        value: diningHall.id
    })).sort((a, b) => b.text - a.text);

    if (catering === undefined) return <DisabledReservationCard diningHallOptions={diningHallOptions} date={date}/>;

    const inThePast = isInThePast(new Date(catering.date));

    const makeReservation = (cateringId, customerId) => {
        if (loading) return;
        if (inThePast) {
            toast.warning("Geçmiş tarihli rezervasyon yapılamaz")
            return;
        }
        setLoading(true)
        reservationService.makeReservation({cateringId: cateringId, customerId: customerId}).then(response => {
            toast.success("Rezervasyon başarılı");
            dispatch(syncUser({...user, reservations: [...user.reservations, response.data.data]}))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    const cancelReservation = (reservationId) => {
        if (loading) return;
        setLoading(true)
        reservationService.cancelReservation(reservationId).then(() => {
            toast.warn("Rezervasyon iptal edildi");
            const index = user.reservations.findIndex(r => r.id === reservationId);
            if (index === -1) toast.error("Bir sorun oluştu tekrar giriş yapmayı deneyin.")
            user.reservations.splice(index, 1)
            dispatch(syncUser({...user}))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    function CardActionButton() {

        const reservation = user.reservations.find(r => r.catering.id === catering.id);
        const paid = reservation?.paid === true;
        if (inThePast)
            return (
                <button className="container-fluid m-0 h-100 border-0 action-button past cursor-initial">
                    <Icon name="food"/> Afiyet Olsun
                </button>
            )
        if (!!reservation && paid)
            return (
                <button className="container-fluid m-0 h-100 border-0 action-button cursor-initial paid">
                    ÖDEME YAPILDI
                </button>
            )
        if (!!reservation && !paid)
            return (
                <button className={`container-fluid m-0 h-100 border-0 action-button reserved`}
                        onClick={() => cancelReservation(reservation.id)}>
                    {loading ? <Icon name="circle notch" loading size="large"/> : "REZERVASYON YAPILDI"}
                </button>
            )
        return (
            <button
                className={`container-fluid m-0 h-100 border-0 action-button`}
                onClick={() => makeReservation(catering.id, user.id)}>
                {loading ? <Icon name="circle notch" loading size="large"/> : "REZERVASYON YAP"}
            </button>
        )
    }

    return (
        <div className="card h-auto reservation-card border-0 shadow">
            <div className="card-header w-100">
                <div className="d-block"
                     style={{marginBottom: -5}}>{catering.date.replaceAll("-", ".")}</div>
                <Dropdown className="dining-hall-dropdown d-block" selection defaultValue={2}
                          options={diningHallOptions} loading={diningHalls.length === 0}/>
            </div>
            <ul className="list-group list-group-flush">
                {catering.menuItems.map(item =>
                    <li className="list-group-item" id={String(item.id)}>
                        <span className="float-start mx-2">{item.name}</span>
                        <div className="vr bg-black h-100 position-absolute"
                             style={{width: 1, opacity: .2, right: "28%", top: 0}}/>
                        <span className="float-end cal-info">{item.calories}<sup>cal</sup> </span>
                    </li>
                )}

            </ul>
            <div className="card-footer p-0">
                <CardActionButton/>
            </div>
        </div>
    );
}

export default ReservationCard;