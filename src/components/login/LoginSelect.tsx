// LoginSelect.tsx
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, handleEmailLogin, handleEmailSignup, handleGoogleLogin } from "./firebase";
import OverlayRegister from "./OverlayRegister";
import LoginForm from "./LoginForm";
import GoogleLoginButton from "./GoogleLoginButton";
import './LoginSelect.css';

const LoginSelect = () => {
    const [isOverlayVisibleRegister, setIsOverlayVisibleRegister] = useState<boolean>(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const toggleOverlayRegister = () => {
        setIsOverlayVisibleRegister(!isOverlayVisibleRegister);
    };

    return (
        <div className="LoginSelect">
            <LoginForm handleEmailLogin={handleEmailLogin} />
            <button className='SignOutbutton' onClick={toggleOverlayRegister}>新規登録</button>
            {isOverlayVisibleRegister && <OverlayRegister onClose={toggleOverlayRegister} handleEmailSignup={handleEmailSignup} />}
            <GoogleLoginButton handleClickGoogle={handleGoogleLogin} />
        </div>
    );
};

export default LoginSelect;
