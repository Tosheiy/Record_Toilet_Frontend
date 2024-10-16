import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <button className="SignOutbutton" onClick={handleLogin}>サインインしてください</button>
        </div>
    );
};

export default LoginButton;
