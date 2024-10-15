import React, { useState } from 'react';
import './OverlayModify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { updateRecord, deleteRecord } from '../api'

interface OverlayProps {
    onClose: () => void; // 閉じる関数を渡す
    init_date: string;
    id: string;
    init_val: string;
    init_time: string;
    init_location: string;
    init_description: string;
}

const OverlayModify: React.FC<OverlayProps> = ({ onClose, id, init_date, init_val, init_time, init_location, init_description }) => {
    const handleOverlayClickModify = (e: React.MouseEvent<HTMLDivElement>) => {
        // クリックイベントがオーバーレイの内側でなければ onClose を呼び出す
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
    const [date, setDate] = useState(init_date);
    const [feeling, setFeeling] = useState(init_val);
    const [time, setTime] = useState(init_time);
    const [location, setLocation] = useState(init_location);
    const [description, setDescription] = useState(init_description);

    const handleSubmitClickModify = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ページリロードを防ぐ

        if (user) {
            const recordData = {
                description: description,
                length_time: parseNumber(time),
                location_at: location,
                feeling: parseNumber(feeling),
                created_at: date.slice(0, 16).replace('T', ' '),
            };

            try {
                await updateRecord(id ,recordData);

                // 登録が成功したらオーバーレイを閉じる
                onClose();
            } catch (error) {
                console.error('データ送信中にエラーが発生しました:', error);
            }
        }
    };

    const handleDeleteClickModify = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ページリロードを防ぐ

        if (user) {
            try {
                await deleteRecord(id);

                // 登録が成功したらオーバーレイを閉じる
                onClose();
            } catch (error) {
                console.error('データ送信中にエラーが発生しました:', error);
            }
        }
    };

    return (
        <div className="overlay-modify" onClick={handleOverlayClickModify}>
            <div className="overlay-content-modify" onClick={(e) => e.stopPropagation()}>
                <h2 className="overlay-title-modify">記録編集</h2>
                <label>
                    <span className="textbox-3-label-modify">日時</span>
                    <input type="datetime-local" className="textbox-3-modify" placeholder="日時を入力" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    <span className="textbox-3-label-modify">評価</span>
                    <input type="number" min="1" max="5" className="textbox-3-modify" placeholder="評価を入力" value={feeling} onChange={(e) => setFeeling(e.target.value)} />
                </label>
                <label>
                    <span className="textbox-3-label-modify">トイレ時間</span>
                    <input type="number" min="1" step="1" className="textbox-3-modify" placeholder="トイレ時間を入力" value={time} onChange={(e) => setTime(e.target.value)} />
                </label>
                <label>
                    <span className="textbox-3-label-modify">場所</span>
                    <input type="text" className="textbox-3-modify" maxLength={20} placeholder="場所を入力" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <label>
                    <span className="textbox-3-label-modify">説明</span>
                    <input type="text" style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',}} className="textbox-3-modify" maxLength={50} placeholder="説明を入力" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <div className='button-container-modify'>
                    <button className="register_Button-modify" onClick={handleSubmitClickModify}>完了</button>
                    <button className="register_Button-modify-delete" onClick={handleDeleteClickModify}>削除</button>
                </div>
            </div>
        </div>
    );
};

export default OverlayModify;