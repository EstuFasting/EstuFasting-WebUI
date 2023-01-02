import React from 'react';
import {DAY_NAMES} from "../utilities/constants";
import {weekdayIndex} from "../utilities/dateUtils";
import {useTranslation} from "react-i18next";

function MenuDisplayCard({date, menuItems}) {

    const {t} = useTranslation();

    return (
        <div className="menu-display-card shadow">
            <div className="row">
                <div className="col-lg-5 date shadow">
                    <div className="day">{date.getDate()}</div>
                    <div className="weekday">
                        {t(DAY_NAMES[weekdayIndex(date.getDate(), date.getMonth(), date.getFullYear())])}
                    </div>
                </div>
                <div className="col-lg-7 glass-card menu-items">
                    {menuItems.map(item => <div>{item.name}</div>)}
                </div>
            </div>
        </div>
    );

}

export default MenuDisplayCard;