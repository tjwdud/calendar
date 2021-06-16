import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Monthly from 'js/containers/calendarView/Monthly';
import Weekly from 'js/containers/calendarView/Weekly';
import Daily from 'js/containers/calendarView/Daily';
import ControlView from 'js/containers/controlView/ControlView';
import CalendarView from 'js/containers/calendarView/CalendarView';
import AddForm from 'js/containers/components/AddForm';
import ErrorPopup from 'js/containers/components/ErrorPopup';
import StudentsControl from 'js/containers/components/StudentsControl';
import TimeTable from 'js/containers/components/TimeTable';
import Navigation from 'js/containers/components/Navigation';
import Profile from 'js/containers/components/Profile';
import Auth from 'js/containers/components/Auth';
import Home from 'js/containers/components/Home';

import 'sass/app.css';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <div id="app">
                {isLoggedIn ?

                    <><ControlView />
                        <Switch>
                            <>
                                <div id="calendar-view">
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/monthly" component={Monthly} />
                                    <Route exact path="/weekly" component={Weekly} />
                                    <Route exact path="/daily" component={Daily} />
                                    <Route exact path="/student" component={StudentsControl} />
                                    <Route exact path="/timetable" component={TimeTable} />
                                    <Route exact path="/profile" component={Profile} />
                                </div>
                            </>
                        </Switch>
                        <AddForm />
                        <ErrorPopup /></> : <Route exact path="/"><Auth /></Route>
                }
            </div>
        </BrowserRouter>
    )
};

export default AppRouter;