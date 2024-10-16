// LoginForm.tsx
import React, { useState } from "react";

interface LoginFormProps {
    handleEmailLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleEmailLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLoginClick = () => {
        handleEmailLogin(email, password);
    };

    return (
        <div>
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
            <button className='SignOutbutton' onClick={handleLoginClick}>ログイン</button>
        </div>
    );
};

export default LoginForm;
