import React, {useState} from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import {MONTH_NAMES} from "../utilities/constants";
import {value} from "lodash/seq";
import {classNames, range} from "../utilities/utils";
import {dateToDateString, getDayCountOfMonth, weekdayIndex} from "../utilities/dateUtils";

function EsCalendar({foot, reservations}) {

    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();
    const currentMonth = MONTH_NAMES[currentMonthIndex];
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const selectedMonthIndex = MONTH_NAMES.indexOf(selectedMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const monthOptions = MONTH_NAMES.map((monthName, index) => ({
        key: monthName,
        text: monthName,
        value: index
    })).sort((a, b) => {
        if (a.text === currentMonth && b.text !== currentMonth) return -1
    });

    const YEARS = range(40, currentYear - 4);
    const yearOptions = YEARS.map((year, index) => ({
        key: year,
        text: year,
        value: index
    })).sort((a, b) => {
        if (a.text === currentYear && b.text !== currentYear) return -1
    });

    const getMonthInfo = (monthIndex, year = selectedYear) => {
        return {
            index: monthIndex,
            lastWeekdayIndex: weekdayIndex(getDayCountOfMonth(monthIndex + 1, year), monthIndex, year),
            lastMonthDay: getDayCountOfMonth(monthIndex + 1, year)
        }
    }

    const prevMonthInfo = getMonthInfo(selectedMonthIndex - 1, selectedMonthIndex === 0 ? selectedYear - 1 : selectedYear);
    const currMonthInfo = getMonthInfo(selectedMonthIndex);

    const calendarCells = (startAt, size = 7, disabled = undefined, monthIndex = selectedMonthIndex) => {
        return range(size, startAt).map(day => {
            const filtered = reservations.filter(reservation => dateToDateString(new Date(selectedYear, monthIndex, day + 1)) === dateToDateString(reservation.date));
            const labels = filtered.length === 0 ? undefined : filtered.map(reservation => reservation.label);
            return <td id={String(Math.random() * 100000)} className={classNames({
                "day": true,
                "disabled": disabled ? disabled : weekdayIndex(day, monthIndex, selectedYear) >= 5
            })}>
                <div className="date">{day}</div>
                {labels}
            </td>
        });
    }

    const nextMonth = () => {
        if (selectedMonthIndex === 11) setSelectedYear(selectedYear + 1)
        setSelectedMonth(MONTH_NAMES[(selectedMonthIndex + 1) % 12]);
    }

    const prevMonth = () => {
        if (selectedMonthIndex === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(MONTH_NAMES[11]);
            return;
        }
        setSelectedMonth(MONTH_NAMES[selectedMonthIndex - 1]);
    }

    return (
        <div id="calendar-wrapper">
            <Dropdown className="calendar-dropdown" style={{left: 290}} placeholder={selectedYear + " Yılı"} search
                      selection value={selectedYear} options={yearOptions}
                      onChange={(event, data) => setSelectedYear(YEARS[data.value])}/>
            <Dropdown className="calendar-dropdown" style={{left: 450}} placeholder={selectedMonth + " Ayı"} search
                      selection value={selectedMonth} options={monthOptions}
                      onChange={(event, data) => setSelectedMonth(MONTH_NAMES[data.value])}/>
            <div className="text-center month-name">
                <div>
                    <Icon name="angle left" onClick={prevMonth}/>
                    {selectedMonth}
                    <Icon name="angle right" onClick={nextMonth}/>
                </div>
            </div>
            <table id="calendar" className="rounded">
                <tr className="weekdays">
                    <th scope="col" style={{borderTopLeftRadius: 15}}>PAZARTESİ</th>
                    <th scope="col">SALI</th>
                    <th scope="col">ÇARŞAMBA</th>
                    <th scope="col">PERŞEMBE</th>
                    <th scope="col">CUMA</th>
                    <th scope="col">CUMARTESİ</th>
                    <th scope="col" style={{borderTopRightRadius: 15}}>PAZAR</th>
                </tr>

                <tr className="days">
                    {calendarCells(prevMonthInfo.lastMonthDay - prevMonthInfo.lastWeekdayIndex, prevMonthInfo.lastWeekdayIndex + 1, true, selectedMonthIndex - 1)}
                    {calendarCells(1, 6 - prevMonthInfo.lastWeekdayIndex)}
                </tr>
                <tr>
                    {calendarCells(7 - prevMonthInfo.lastWeekdayIndex)}
                </tr>
                <tr>
                    {calendarCells(14 - prevMonthInfo.lastWeekdayIndex)}
                </tr>
                <tr>
                    {calendarCells(21 - prevMonthInfo.lastWeekdayIndex)}
                </tr>
                <tr>
                    {calendarCells(28 - prevMonthInfo.lastWeekdayIndex, currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27 > 7 ? 7 : currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27)}
                    {currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27 > 7 ? undefined :
                        calendarCells(1, 7 - (currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27), true, selectedMonthIndex + 1)}
                </tr>
                <tr>
                    {currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27 <= 7 ? undefined :
                        calendarCells(35 - prevMonthInfo.lastWeekdayIndex, currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 34)}
                    {calendarCells(
                        currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27 > 7 ? 1 : 7 - (currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27) + 1,
                        currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 27 <= 7 ? 7 : 7 - (currMonthInfo.lastMonthDay + prevMonthInfo.lastWeekdayIndex - 34), true, selectedMonthIndex + 1)}
                </tr>

                {foot}
            </table>
        </div>
    );
}

export default EsCalendar;