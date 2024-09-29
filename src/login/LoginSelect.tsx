import React, { useEffect, useState } from "react";
import { auth, handleEmailLogin, handleEmailSignup, handleGoogleLogin } from "./firebase";
import './LoginSelect.css';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginSelect = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home');
    };
    const handleClickLogin = async (email: string, password: string) => {
        handleEmailLogin(email, password);
        handleClick();
    };

    const handleClickGoogle = async () => {
        await handleGoogleLogin();
        handleClick();
    };

    interface OverlayProps {
        onClose: () => void; // 閉じる関数を渡す
    }

    const OverlayRegister: React.FC<OverlayProps> = ({ onClose }) => {
        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            // クリックイベントがオーバーレイの内側でなければ onClose を呼び出す
            if (e.target === e.currentTarget)
                if (e.target === e.currentTarget) {
                    onClose();
                }
        };

        const handleClickRegister = async (email: string, password: string) => {
            handleEmailSignup(email, password);
            handleClick();
        };

        return (
            <div className="overlayRegister" onClick={handleOverlayClick}>
                <div className="overlayContentRegister">
                    <h3 className="overlayheaderStyle">メールアドレスで新規登録</h3>
                <label>
                        <span className="overlaytextbox-3-label">メールアドレス</span>
                    <input
                        type="email"
                        className="textbox-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="メールアドレス"
                    />
                </label>
                <label>
                        <span className="overlaytextbox-3-label">パスワード</span>
                    <input
                        type="password"
                        className="textbox-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワード"
                    />
                </label>
                    <button className='SignOutbutton' onClick={() => handleClickRegister(email, password)}>新規登録</button>
                </div>
            </div>
        );
    };

    const [isOverlayVisibleRegister, setIsOverlayVisibleRegister] = useState<boolean>(false);

    const toggleOverlayRegister = () => {
        setIsOverlayVisibleRegister(!isOverlayVisibleRegister);
    }

    const [user] = useAuthState(auth);

    useEffect(() => {
        const runAsyncFunction = async () => {
            if (user) {
                navigate("/home"); // ログインしていない場合にリダイレクト\
            }
        };

        runAsyncFunction();
    }, [user]);


    return (
        <div className="LoginSelect">
            <h3 className="headerStyle">メールアドレスでログイン</h3>
            <label>
                <span className="textbox-3-label-login">メールアドレス</span>
                <input
                    type="email"
                    className="textbox-3-login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                />
            </label>
            <label>
                <span className="textbox-3-label-login">パスワード</span>
                <input
                    type="password"
                    className="textbox-3-login"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                />
            </label>
            <button className='SignOutbutton' onClick={() => handleClickLogin(email, password)}>ログイン</button>
            <button className='SignOutbutton' onClick={toggleOverlayRegister}>新規登録</button>
            {isOverlayVisibleRegister && <OverlayRegister onClose={toggleOverlayRegister} />}
            <button className="gsi-material-button" onClick={handleClickGoogle}>
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Google</span>
                    <span style={{ display: "none", }}>Sign in with Google</span>
                </div>
            </button>
        </div>
    );
};

export default LoginSelect;