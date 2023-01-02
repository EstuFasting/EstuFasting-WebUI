import React from 'react';
import {Icon} from "semantic-ui-react";
import EsCalendar from "../components/EsCalendar";
import {useSelector} from "react-redux";
import {classNames} from "../utilities/utils";
import {useTranslation} from "react-i18next";
import {removeToken} from "../localStorage";

function Calendar() {

    const {t} = useTranslation();
    const user = useSelector(state => state?.user.userProps.user);

    const calendarReservations = user.reservations?.map(reservation => {
        return {
            date: new Date(reservation.catering.date),
            label:
                <div id={String(Math.random() * 100000)}
                     className={classNames({"meal": true, "paid": reservation.paid})}>
                    <div className="meal-desc">
                        {t(reservation.catering.meal.name)}
                    </div>
                </div>
        }
    })

    return (
        <EsCalendar reservations={calendarReservations} foot={
            <tr className="foot disabled">
                <td>{t("What is it")}?</td>
                <td>
                    <div>
                        <Icon name="circle" style={{color: "#2D4F02"}} size="small"/>
                        {t("Paid Reservation")}
                    </div>
                </td>
                <td>
                    <div>
                        <Icon name="circle" style={{color: "#E89722"}} size="small"/>
                        {t("Reservation Not Paid Yet")}
                    </div>
                </td>
                <td></td>
                <td></td>
            </tr>
        }/>
    );

}

export default Calendar;