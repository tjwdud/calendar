import React from 'react';
import 'sass/app.css';
import { Link } from "react-router-dom";
import 'sass/homeController.css'
import { useCalendarState } from 'js/stores/calendarState';
import {
    faCalendar,
    faCalendarWeek,
    faCalendarDay,
    faUserPlus,
    faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ModeController = ({ history, home }) => {
    const [calendarState, setCalendarState] = useCalendarState();
    const { mode } = calendarState;

    const onClickModeBtn = (mode) => {
        switch (mode) {
            case 'monthly':
                setCalendarState({ ...calendarState, mode: mode });
                history.push("/monthly");
                break;
            case 'weekly':
                setCalendarState({ ...calendarState, mode: mode });
                history.push("/weekly");
                break;
            case 'daily':
                setCalendarState({ ...calendarState, mode: mode });
                history.push("/daily");
                break;
            case 'student':
                setCalendarState({ ...calendarState, mode: mode });
                history.push("/student");
                break;
            case 'timetable':
                setCalendarState({ ...calendarState, mode: mode });
                history.push("/timetable");
                break;

        }
    }
    
    const modeList = ["monthly", "weekly", "daily", "student", "timetable"];
    const modeIconList = [faCalendar, faCalendarWeek, faCalendarDay, faUserPlus, faChalkboardTeacher];

    return (

        <>{modeList.map((a, i) => (
            <div id="mode-btn" key={i} className={mode === a ? 'active' : null} onClick={() => onClickModeBtn(a)}>
                <FontAwesomeIcon icon={modeIconList[i]} className="iconbtn" />
                <div className="mode-title">
                    {a}
                </div>
            </div>
        ))}
        </>
    )
};

export default ModeController;