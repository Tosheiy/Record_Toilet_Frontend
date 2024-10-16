// Setting.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { fetchUser, generateAPIKey, updateAPIKey, deleteAPIKey } from '../../api/api';
import UserApiInfo from './UserApiInfo';
import './Setting.css';

function Setting() {
    const [user] = useAuthState(auth);
    const [selfAuthFlag, setSelfAuthFlag] = useState<boolean>(false);
    const [selfAuthObject, setSelfAuthObject] = useState<{ utid: string; apikey: string }>();
    const [isOverlayVisibleCheckUpdate, setIsOverlayVisibleCheckUpdate] = useState<boolean>(false);
    const [isOverlayVisibleCheckDelete, setIsOverlayVisibleCheckDelete] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const userData = await fetchUser();
                if (userData) {
                    setSelfAuthObject(userData);
                    setSelfAuthFlag(userData.utid !== "none");
                }
            };
            fetchData();
        }
    }, [location, user]);

    const generateAPIkey = async () => {
        const userData = await generateAPIKey();
        setSelfAuthObject(userData);
        setSelfAuthFlag(userData.utid !== "none");
        navigate('/setting');
    };

    const updateAPIkey = async () => {
        if (selfAuthObject?.utid) {
            const userData = await updateAPIKey(selfAuthObject.utid);
            setSelfAuthObject(userData);
            setSelfAuthFlag(userData.utid !== "none");
            navigate('/setting');
        }
    };

    const deleteAPIkey = async () => {
        if (selfAuthObject?.utid) {
            await deleteAPIKey(selfAuthObject.utid);
            setSelfAuthObject({ utid: "none", apikey: "none" });
            setSelfAuthFlag(false);
            navigate('/setting');
        }
    };

    return (
        <div className='Setting'>
            <h2>設定</h2>
            <h3>Self API</h3>
            {selfAuthFlag ? (
                <UserApiInfo
                    utid={selfAuthObject?.utid || ''}
                    apikey={selfAuthObject?.apikey || ''}
                    onUpdate={updateAPIkey}
                    onDelete={deleteAPIkey}
                    isOverlayVisibleCheckUpdate={isOverlayVisibleCheckUpdate}
                    isOverlayVisibleCheckDelete={isOverlayVisibleCheckDelete}
                    ClickUpdate={() => setIsOverlayVisibleCheckUpdate(!isOverlayVisibleCheckUpdate)}
                    ClickDelete={() => setIsOverlayVisibleCheckDelete(!isOverlayVisibleCheckDelete)}
                />
            ) : (
                <button className='generatekeybutton1' onClick={generateAPIkey}>APIキーを生成</button>
            )}
        </div>
    );
}

export default Setting;
