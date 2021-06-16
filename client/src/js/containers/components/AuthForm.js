import React, { useState } from "react";
import { authService } from "../../../fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );

            } else {
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
        } catch (error) {
            setError(error.message);
        }

    };

    const onChange = (e) => {
        const { target: { name, value } } = e;
        console.log(name);
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }



    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />{error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "로그인" : "가입하기"}</span>
        </>
    )
};

export default AuthForm;
