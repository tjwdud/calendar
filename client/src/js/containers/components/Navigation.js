import React from "react";

import { authService } from '../../../fbase'
import { useHistory } from "react-router-dom";
import 'sass/app.css';

const Navigation = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <nav>
            <div id="logoutbtn"onClick={onLogOutClick}>Log out</div> 
        </nav>
    );
}

export default Navigation;