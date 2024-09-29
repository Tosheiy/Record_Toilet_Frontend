import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Setting.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { UserInfo, SignOutButton, SignInButton } from '../login/Login'
import axios from 'axios';
import OverlayChecking from './OverlayChecking';


// Setting画面の全てがここにある（SelfAPI作成）
function Setting() {
    const [user] = useAuthState(auth);
    const [selfAuthFlag, setSelfAuthFlag] = useState<boolean>(false);
    const [selfAuthObject, setSelfAuthObject] = useState<User>();
    const [isOverlayVisibleCheckUpdate, setIsOverlayVisibleCheckUpdate] = useState<boolean>(false);
    const [isOverlayVisibleCheckDelete, setIsOverlayVisibleCheckDelete] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/setting');
    }

    const waitForOneSecond = () => {
        return new Promise(resolve => setTimeout(resolve, 100));
    };

    type User = {
        utid: string;
        apikey: string;
    };

    const location = useLocation();

    useEffect(() => {
        if (user) {

            const fetchData = async () => {

                await waitForOneSecond();
                // データ取得の処理など
                try {
                    // トークンを取得する
                    let idToken = '';
                    if (auth.currentUser) {
                        idToken = await auth.currentUser.getIdToken();
                    }

                    const result = await axios.get("http://localhost:8080/toilet/self", {
                        headers: {
                            'Authorization': `Bearer ${idToken}`
                        }
                    })

                    const utid = result.data.utid;
                    const apikey = result.data.apikey;

                    // User オブジェクトを作成
                    const userObject: User = { utid, apikey };

                    // User オブジェクトを状態に設定
                    setSelfAuthObject(userObject);



                    if (utid !== "none") {
                        setSelfAuthFlag(true);
                    }

                } catch (error) {
                    console.log('失敗');
                    console.log(error);
                }

            }
            fetchData();
        }
    }, [location]);


    const generateAPIkey = () => {

        const fetchData = async () => {

            // データ取得の処理など
            try {
                // トークンを取得する
                let idToken = '';
                if (auth.currentUser) {
                    idToken = await auth.currentUser.getIdToken();
                }

                const result = await axios.get("http://localhost:8080/toilet/self/register", {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                })

                const utid = result.data.utid;
                const apikey = result.data.apiikey;

                // User オブジェクトを作成
                const userObject: User = { utid, apikey };

                // User オブジェクトを状態に設定
                setSelfAuthObject(userObject);


                if (utid !== "none") {
                    setSelfAuthFlag(true);
                }

            } catch (error) {
                console.log('失敗');
                console.log(error);
            }

        };
        fetchData();
        handleClick();
    };

    const updateAPIkey = () => {

        const fetchData = async () => {

            // データ取得の処理など
            try {
                // トークンを取得する
                let idToken = '';
                if (auth.currentUser) {
                    idToken = await auth.currentUser.getIdToken();
                }

                const payload = {}
                const result = await axios.put("http://localhost:8080/toilet/self", payload, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                })

                const utid = result.data.utid;
                const apikey = result.data.apiikey;

                // User オブジェクトを作成
                const userObject: User = { utid, apikey };

                // User オブジェクトを状態に設定
                setSelfAuthObject(userObject);

                if (utid !== "none") {
                    setSelfAuthFlag(true);
                }

            } catch (error) {
                console.log('失敗');
                console.log(error);
            }

        };
        fetchData();
        handleClick();
    };

    const deleteAPIkey = () => {

        const fetchData = async () => {

            // データ取得の処理など
            try {
                // トークンを取得する
                let idToken = '';
                if (auth.currentUser) {
                    idToken = await auth.currentUser.getIdToken();
                }

                const result = await axios.delete("http://localhost:8080/toilet/self", {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                })

                const utid: string = "none";
                const apikey: string = "none";

                // User オブジェクトを作成
                const userObject: User = { utid, apikey };

                // User オブジェクトを状態に設定
                setSelfAuthObject(userObject);



                if (utid !== "none") {
                    setSelfAuthFlag(true);
                }

            } catch (error) {
                console.log('失敗');
                console.log(error);
            }

        };
        fetchData();
        setSelfAuthFlag(false)
        handleClick();
    };

    const GenerateApiButton = () => {
        return (
            <div>
                <button className='generatekeybutton1' onClick={generateAPIkey}>APIキーを生成</button>
            </div>
        )
    }

    const copyButton = (elementId: string): React.MouseEventHandler<HTMLImageElement> => (event) => {
        // 引数で得たIDの要素のテキストを取得
        const element = document.getElementById(elementId) as HTMLInputElement;

        // 上記要素をクリップボードにコピーする
        if (element && element.value !== null) {
            navigator.clipboard.writeText(element.value);
        }
    };

    const ClickUpdate = () => {
        setIsOverlayVisibleCheckUpdate(!isOverlayVisibleCheckUpdate);
    }
    const ClickDelete = () => {
        setIsOverlayVisibleCheckDelete(!isOverlayVisibleCheckDelete);
    }

    const UserApiInfo = () => {
        return (
            <div>
                <div>
                    <label>
                        <span className="textbox-2-label">ID</span>
                        <input
                            type="text"
                            className="textbox-2"
                            id="utid"
                            value={selfAuthObject?.utid || ''}
                            readOnly />
                        <img src="./copy.png" alt="filter" className="button-image-copy" onClick={copyButton("utid")} />
                    </label>
                    <label>
                        <span className="textbox-2-label">API key</span>
                        <input
                            type="password"
                            className="textbox-2"
                            id="apikey"
                            value={selfAuthObject?.apikey || ''}
                            readOnly
                        />
                        <img src="./copy.png" alt="filter" className="button-image-copy" onClick={copyButton("apikey")} />
                    </label>
                </div>
                <div className='buttonstyle'>
                    <button className='generatekeybutton' onClick={ClickUpdate}>更新</button>
                    {isOverlayVisibleCheckUpdate && (
                        <OverlayChecking
                            onClose={ClickUpdate}
                            onProcess={updateAPIkey}
                            target='更新'
                        />
                    )}
                    <button className='generatekeybutton' onClick={ClickDelete}>削除</button>
                    {isOverlayVisibleCheckDelete && (
                        <OverlayChecking
                            onClose={ClickDelete}
                            onProcess={deleteAPIkey}
                            target='削除'
                        />
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='Setting'>
            <h2>設定</h2>
            <h3>Self API</h3>
            {selfAuthFlag ? (
                <div>
                    <UserApiInfo />
                </div>
            ) : (
                <GenerateApiButton />
            )
            }
        </div>
    );
}

export default Setting;



