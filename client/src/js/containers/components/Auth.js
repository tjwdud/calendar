import React, { useState } from "react";
import { authService, firebaseInstance } from "../../../fbase";
import AuthForm from "./AuthForm";
import auth from "sass/auth.css"

const Auth = () => {

    /*const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);

    }*/

            /*구글 로그인이 버그가 있어 나중에 사용
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>*/

    return (
        <div className="authContainer">
            <AuthForm />

        </div>
    );


};

export default Auth;