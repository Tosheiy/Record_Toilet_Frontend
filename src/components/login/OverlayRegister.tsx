// OverlayRegister.tsx
import React, { useState } from 'react';
import './LoginSelect.css'; // 必要に応じてスタイルを分離

interface OverlayProps {
    onClose: () => void;
    handleEmailSignup: (email: string, password: string) => Promise<void>;
}

const OverlayRegister: React.FC<OverlayProps> = ({ onClose, handleEmailSignup }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClickRegister = async () => {
        await handleEmailSignup(email, password);
        onClose();
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
                <button className="SignOutbutton" onClick={handleClickRegister}>新規登録</button>
            </div>
        </div>
    );
};

export default OverlayRegister;
