import React, {useEffect, useState} from 'react';
import Mastercard from "../assets/images/Mastercard.png";
import Visa from "../assets/images/Visa.png";
import Troy from "../assets/images/Troy.png";
import {Icon, Table} from "semantic-ui-react";
import ReservationService from "../services/reservationService";
import {useDispatch, useSelector} from "react-redux";
import {addDays, isInThePast} from "../utilities/dateUtils";
import {toast} from "react-toastify";
import {syncUser} from "../store/actions/userActions";
import {handleCatch} from "../utilities/utils";
import PaymentSummary from "../components/PaymentSummary";

function Payment() {

    const reservationService = new ReservationService();

    const user = useSelector(state => state?.user.userProps.user);
    const dispatch = useDispatch();
    const [cardNo, setCardNo] = useState("");
    const [cardOwner, setCardOwner] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [reservations, setReservations] = useState([]);
    const [otherReservations, setOtherReservations] = useState([]);
    const [lunchCount, setLunchCount] = useState(0);
    const [dinnerCount, setDinnerCount] = useState(0);

    useEffect(() => {
        let tempLunchCount = 0;
        let tempDinnerCount = 0;
        let tempReservations = [];
        let tempOtherReservations = [];
        for (const reservation of user.reservations) {
            if (reservation.paid === true || isInThePast(addDays(new Date(reservation.catering.date), -2))) {
                tempOtherReservations.push(reservation)
                continue
            }
            tempReservations.push(reservation);
            if (reservation.catering.meal.id === 2) tempLunchCount += 1;
            else if (reservation.catering.meal.id === 3) tempDinnerCount += 1;
        }
        setOtherReservations(tempOtherReservations)
        setReservations(tempReservations);
        setLunchCount(tempLunchCount)
        setDinnerCount(tempDinnerCount)
    }, [user])

    const completePayments = () => {
        if (cardNo.length !== 19 || cardOwner.length <= 5 || !cardOwner.includes(" ") || Number(month) < 1 || Number(year) < 22 || cvv.length < 3) {
            toast.warning("Kart bilgilerinizi doğru giriniz")
            return;
        }
        if (reservations.length === 0) return;
        const ids = reservations.map(r => r.id)
        reservationService.completePaymentsMultiple({ids: ids}).then(() => {
            toast.success("Ödeme işlemi başarılı");
            dispatch(syncUser({
                ...user, reservations: reservations.map(r => {
                    return {
                        ...r,
                        paid: true
                    }
                }).concat(otherReservations)
            }))
        }).catch(handleCatch)
    }

    function cardNoFormat(value) {
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []
        let len = match.length

        for (let i = 0; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    function checkDigit(value) {
        return !isNaN(value.charAt(value.length - 1));
    }

    const handleCardNoChange = (event) => {
        if (checkDigit(event.target.value))
            setCardNo(cardNoFormat(event.target.value))
    }

    const handleCardOwnerChange = (event) => {
        setCardOwner(event.target.value)
    }

    const handleMonthChange = (event) => {
        if (event.target.value.length < 3 && Number(event.target.value) <= 12 && checkDigit(event.target.value))
            setMonth(event.target.value)
    }

    const handleYearChange = (event) => {
        if (event.target.value.length < 3 && checkDigit(event.target.value))
            setYear(event.target.value)
    }

    const handleCvvChange = (event) => {
        if (event.target.value.length < 4 && checkDigit(event.target.value))
            setCvv(event.target.value)
    }

    return (
        <div className="payment-container shadow">
            <div className="payment-container-body">
                <div className="row">
                    <div className="col-md-8">
                        <div className="new-card-content border">
                            <div className="d-flex justify-content-between">
                                <div className="header">
                                    <Icon name="check circle" style={{color: "#1AB267", marginRight: 10}}/>
                                    <h3 className="d-inline">Yeni kart ekle</h3>
                                </div>
                                <div className="icons">
                                    <img src={Troy} className="float-end m-1 mt-2" style={{width: 40}} alt="Troy"/>
                                    <img src={Visa} className="float-end m-2" style={{width: 40}} alt="Visa"/>
                                    <img src={Mastercard} className="float-end m-1" style={{width: 40}}
                                         alt="Mastercard"/>
                                </div>
                            </div>
                            <form className="pt-5">
                                <div className="field d-flex justify-content-around">
                                    <div className="d-flex flex-column mt-1" style={{width: "40%"}}>
                                        <h4 className="label">Kart numarası</h4>
                                        <h5 className="sub-label">Kart üzerindeki 16 haneli numarayı giriniz</h5>
                                    </div>
                                    <div style={{width: "50%"}}>
                                        <Icon name="payment" className="position-absolute ps-3" size="large"
                                              style={{padding: 12}}/>
                                        <input value={cardNo} className="ps-5 w-100" type="text"
                                               onChange={handleCardNoChange}/>
                                    </div>
                                    <Icon name="check circle outline" className="ms-1 me-0" size="big"
                                          style={{
                                              color: cardNo.length === 19 ? "rgb(32,194,0)" : "#C5C5C5",
                                              marginTop: 8,
                                              width: "5%"
                                          }}/>
                                </div>
                                <div className="field d-flex justify-content-around">
                                    <div className="d-flex flex-column mt-1" style={{width: "40%"}}>
                                        <h4 className="label">Kart sahibi</h4>
                                        <h5 className="sub-label">Kart üzerindeki ismi giriniz</h5>
                                    </div>
                                    <div style={{width: "50%"}}>
                                        <Icon name="user" className="position-absolute ps-3" size="large"
                                              style={{padding: 12}}/>
                                        <input className="ps-5 w-100" type="text" onChange={handleCardOwnerChange}
                                            value={cardOwner}/>
                                    </div>
                                    <div style={{width: "5%"}}/>
                                </div>
                                <div className="field d-flex justify-content-around">
                                    <div className="d-flex flex-column mt-1" style={{width: "40%"}}>
                                        <h4 className="label">Ay / Yıl</h4>
                                        <h5 className="sub-label">Kartın son kullanım tarihini giriniz</h5>
                                    </div>
                                    <div style={{width: "50%"}} className="d-flex justify-content-around p-0">
                                        <div style={{width: "45%"}} className="d-flex justify-content-around p-0">
                                            <input className="m-0" style={{width: "44%", paddingLeft: 15}} type="number"
                                                   max="12" min="1" onChange={handleMonthChange} value={month}/>
                                            <span className="m-1 me-0 mt-3"
                                                  style={{width: "12%", fontSize: 30}}>/</span>
                                            <input className="m-0" style={{width: "44%", paddingLeft: 15}} type="number"
                                                   max="99" min="22" onChange={handleYearChange} value={year}/>
                                        </div>
                                        <div className="55% d-flex justify-content-around p-0">
                                            <div className="d-flex flex-column mt-2 ms-3 me-0 ps-2"
                                                 style={{width: "58%"}}>
                                                <h4 className="label">CVV2</h4>
                                                <h5 className="sub-label">Güvenlik kodu</h5>
                                            </div>
                                            <input style={{width: "42%", paddingLeft: 15}} className="m-0" type="number"
                                                   max="999" min="0" onChange={handleCvvChange} value={cvv}/>
                                        </div>
                                    </div>
                                    <div style={{width: "5%"}}/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-between">
                        <PaymentSummary lunchCount={lunchCount} dinnerCount={dinnerCount}/>
                        <div className="mt-4">
                            <button className="complete-payment-button" onClick={completePayments}>Ödemeyi Tamamla
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;