import React, { useState } from 'react';
import './OverlayChecking.css';

interface OverlayCheckingProps {
    onClose: () => void; // 閉じる関数を渡す
    onProcess: () => any; //進める関数を渡す
    target: string;
}

const OverlayChecking: React.FC<OverlayCheckingProps> = ({ onClose, onProcess, target }) => {
    const handleOverlayClickModify = (e: React.MouseEvent<HTMLDivElement>) => {
        // クリックイベントがオーバーレイの内側でなければ onClose を呼び出す
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const onPreProcess = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ページリロードを防ぐ

        onProcess();

        onClose();
    }

    return (
        <div className="overlay-checking" onClick={handleOverlayClickModify}>
            <div className="overlay-content-checking" onClick={(e) => e.stopPropagation()}>
                <h2>{target}しますか？</h2>
                <div className='button-content'>
                    <button className="selectbutton" onClick={onClose}>いいえ</button>
                    <button className="selectbutton" onClick={onPreProcess}>はい</button>
                </div>
            </div>
        </div>
    )
};

export default OverlayChecking;