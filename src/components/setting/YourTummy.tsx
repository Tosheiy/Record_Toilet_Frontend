import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { pingCheck } from '../../api/api';

function YourTummy() {
    const [user] = useAuthState(auth);
    const [data, setData] = useState<any>(null); // データを格納するstate

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    // POSTリクエストを送信
                    const result = await pingCheck()
                    // データをstateに設定
                    setData(result);
                }
            } catch (err) {
                console.error('データの取得に失敗しました', err);
            }
        };

        fetchData();
    }, [user]); // userが変化した時にfetchDataを呼び出す


    return (
        <div className="App">
            <p>作成中</p>
            <p>AIで今の溜まり具合を予測s</p>
            {/* 取得したデータを表示 */}
            <p>{data ? JSON.stringify(data) : 'データがありません'}</p>
        </div>
    );
}

export default YourTummy;
