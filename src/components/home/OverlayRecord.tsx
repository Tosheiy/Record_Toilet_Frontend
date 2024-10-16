import React from 'react';
import './OverlayRecord.css';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { postRecord } from '../../api/api';

interface OverlayProps {
    onClose: () => void; // 閉じる関数を渡す
}

const OverlayRecord: React.FC<OverlayProps> = ({ onClose }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // クリックイベントがオーバーレイの内側でなければ onClose を呼び出す
        if (e.target === e.currentTarget)
            if (e.target === e.currentTarget) {
                onClose();
            }
    };

    // 文字列から数値に変換する関数を作成
    const parseNumber = (value: string | number): number => {
        const parsed = Number(value);
        return isNaN(parsed) ? 0 : parsed; // 数値に変換できない場合はデフォルトで0を設定
    };

    const [user] = useAuthState(auth);
    const [date, setDate] = useState('');
    const [feeling, setFeeling] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ページリロードを防ぐ

        const recordData = {
            description: description,
            length_time: parseNumber(time),
            location_at: location,
            feeling: parseNumber(feeling),
            created_at: date.slice(0, 16).replace('T', ' '),
        };

        if (user) {
            try {
                await postRecord(recordData);

                // 登録が成功したらオーバーレイを閉じる
                onClose();
            } catch (error) {
                console.error('データ送信中にエラーが発生しました:', error);
            }
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="overlay-title">記録作成</h2>
                <label>
                    <span className="RCtextbox-3-label">日時</span>
                    <input type="datetime-local" className="RCtextbox-3" placeholder="日時を入力" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    <span className="RCtextbox-3-label">評価</span>
                    <input type="number" min="1" max="5" step="1" className="RCtextbox-3" placeholder="トイレ時間を入力" value={feeling} onChange={(e) => setFeeling(e.target.value)} />
                </label>
                <label>
                    <span className="RCtextbox-3-label">トイレ時間</span>
                    <input type="number" min="1" step="1" className="RCtextbox-3" placeholder="説明を入力" value={time} onChange={(e) => setTime(e.target.value)} />
                </label>
                <label>
                    <span className="RCtextbox-3-label">場所</span>
                    <input type="text" className="RCtextbox-3" placeholder="場所を入力" maxLength={20} value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <label>
                    <span className="RCtextbox-3-label">説明</span>
                    <input type="text" className="RCtextbox-3" placeholder="説明を入力" maxLength={50} value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button className="register_Button" onClick={handleSubmitClick}>登録</button>
            </div>
        </div>
    );
};

export default OverlayRecord;