import React from 'react';
import {Icon} from "semantic-ui-react";
import EsCalendar from "../components/EsCalendar";
import {useSelector} from "react-redux";
import {classNames} from "../utilities/utils";

function Calendar() {

    const user = useSelector(state => state?.user.userProps.user);

    const calendarReservations = user.reservations?.map(reservation => {
        return {
            date: new Date(reservation.catering.date),
            label:
                <div id={String(Math.random() * 100000)}
                     className={classNames({"meal": true, "paid": reservation.paid})}>
                    <div className="meal-desc">
                        {reservation.catering.meal.name === "Lunch" ? "Öğle Yemeği" : "Akşam Yemeği"}
                    </div>
                </div>
        }
    })

    return (
        <EsCalendar reservations={calendarReservations} foot={
            <tr className="foot disabled">
                <td>Nedir?</td>
                <td>
                    <div>
                        <Icon name="circle" style={{color: "#2D4F02"}} size="small"/> Ödemesi Yapılmış Rezervasyon
                    </div>
                </td>
                <td>
                    <div>
                        <Icon name="circle" style={{color: "#E89722"}} size="small"/> Ödemesi Henüz Yapılmamış
                        Rezervasyon
                    </div>
                </td>
                <td></td>
                <td></td>
            </tr>
        }/>
    );

}

export default Calendar;