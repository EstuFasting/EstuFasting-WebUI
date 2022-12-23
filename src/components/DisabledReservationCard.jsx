import React from 'react';
import {range} from "../utilities/utils";
import {Dropdown, Icon} from "semantic-ui-react";

function DisabledReservationCard({date, diningHallOptions}) {

    return (
        <div className="card h-auto reservation-card border-0 disabled">
            <div className="card-header w-100">
                <div className="d-block"
                     style={{marginBottom: -5}}>{date.replaceAll("-", ".")}</div>
                <Dropdown className="dining-hall-dropdown d-block" selection defaultValue={2} disabled
                          options={diningHallOptions} loading={diningHallOptions.length === 0}/>
            </div>
            <ul className="list-group list-group-flush">
                {range(4).map((n) => {
                    return (
                        <li className="list-group-item">
                            <span className="float-start mx-2">-</span>
                            <div className="vr bg-black h-100 position-absolute"
                                 style={{width: 1, opacity: .2, right: "28%", top: 0}}/>
                            <span className="float-end cal-info">-<sup>cal</sup> </span>
                        </li>
                    )
                })}

            </ul>
            <div className="card-footer p-0">
                <button className={`container-fluid m-0 h-100 border-0 action-button`}
                        style={{backgroundColor: "#525252", cursor: "initial"}}>
                    <Icon name="wait"/> Günün menüsü oluşturulmadı
                </button>
            </div>
        </div>
    );
}

export default DisabledReservationCard;