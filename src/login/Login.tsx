import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import OverlayChecking from '../main/OverlayChecking';

function Login() {
    const [user] = useAuthState(auth);

    return (
        <div className='Login'>
            {user ? (
                <div>
                    <UserInfo />
                    <SignOutButton />
                </div>
            ) : (
                <SignInButton />
            )
            }

        </div>
    )
}

export default Login;


function SignInButton() {
    const navigate = useNavigate();
    const handleClickSignIn = () => {
        navigate('/login');
    };

    return (
        <button className='SignOutbutton' onClick={handleClickSignIn}>
            <p>サインイン</p>
        </button>
    )
}

function SignOutButton() {
    const [isOverlayVisibleCheckLogout, setIsOverlayVisibleCheckLogout] = useState<boolean>(false);

    const ClickSignOut = () => {
        setIsOverlayVisibleCheckLogout(!isOverlayVisibleCheckLogout);
    }

    const toggleOverlayChecking = () => {
        setIsOverlayVisibleCheckLogout(!isOverlayVisibleCheckLogout);
    };

    const navigate = useNavigate();
    const logoutProcess = async () => {
        await auth.signOut()
        navigate('/login');
    } 


    return (
        <div>
            <button className='SignOutbutton' onClick={ClickSignOut}>
                <p>サインアウト</p>
            </button>
            {isOverlayVisibleCheckLogout && (
                <OverlayChecking
                    onClose={toggleOverlayChecking}
                    onProcess={logoutProcess}
                    target='サインアウト'
                />
            )}
        </div>
    )
}

function UserInfo() {
    const srcValue: string | null | undefined = auth.currentUser?.photoURL; // currentUserがnullまたはundefinedの場合に備える
    const imgSrc: string | undefined = srcValue ?? undefined;  // nullやundefinedを処理
    const nameValue: string | null | undefined = auth.currentUser?.displayName; // currentUserがnullまたはundefinedの場合に備える
    const userName: string | undefined = nameValue ?? undefined;  // nullやundefinedを処理

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/setting');
    };


    return (
        <div>
            <div className='UserInfo'>
                <img className='imgStyle' src={imgSrc} alt='User profile' />
                <p className='textStyle'>{userName}</p>
            </div>
            <button className='Settingbutton' onClick={handleClick}>
                <p>設定</p>
            </button>
            <div className="hr"></div>
        </div>
    );
}

export { UserInfo, SignOutButton, SignInButton, Login };