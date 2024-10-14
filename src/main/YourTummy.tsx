import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';

const requestURL = process.env.REACT_APP_REQUEST_URL;

function YourTummy() {
    const [user] = useAuthState(auth);
    const [data, setData] = useState<any>(null); // データを格納するstate

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    // トークンを取得する
                    let idToken = '';
                    if (auth.currentUser) {
                        idToken = await auth.currentUser.getIdToken();
                    }

                    // POSTリクエストを送信
                    const result = await axios.get(requestURL + '/ping', {
                        headers: {
                            'Content-Type': 'application/json',
                            // 認証情報をヘッダーに追加
                            'Authorization': `Bearer ${idToken}`
                        }
                    });

                    // データをstateに設定
                    setData(result.data);
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
            <p>AIで今の溜まり具合を予測</p>
            {/* 取得したデータを表示 */}
            <p>{data ? JSON.stringify(data) : 'データがありません'}</p>
        </div>
    );
}

export default YourTummy;
