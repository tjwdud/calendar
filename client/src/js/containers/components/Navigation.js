import React, { useRef } from "react";

import { authService } from '../../../fbase'
import { useHistory } from "react-router-dom";
import 'sass/app.css';

const Navigation = () => {
    const btnRef = useRef(null);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");

    }
    const onPrintBtn = () =>{
        const html = document.querySelector('html');
        const printContents = document.querySelector('#calendar-view').innerHTML;
        const printDiv = document.createElement("DIV");
        printDiv.className = 'printDiv';
        html.appendChild(printDiv);
        printDiv.innerHTML = printContents;
        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printDiv.style.display='none';
    }
    const onKeyDownP = (e) => {
        if (e.keyCode === 80) {
            console.log(e.keyCode)
            onPrintBtn();
        }
    }
    return (
        <nav>
            <div id="logoutbtn"onClick={onLogOutClick}>Log out</div> 
            <div id="printbtn"onClick={onPrintBtn} onKeyDown={onKeyDownP} >Print</div>
        </nav>
    )
}

export default Navigation;