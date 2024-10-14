import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { auth } from './login/firebase';
import { Record } from './types';

const requestURL = process.env.REACT_APP_REQUEST_URL || '';

function useRecords() {
    const [records, setRecords] = useState<Record[]>([]);
    const [recordsUpdated, setRecordsUpdated] = useState<boolean>(false);
    const [isOverlayVisibleMaking, setIsOverlayVisibleMaking] = useState<boolean>(false);
    const [isOverlayVisibleModify, setIsOverlayVisibleModify] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

    const fetchData = useCallback(async () => {
        try {
            if (auth.currentUser) {
                const idToken = await auth.currentUser.getIdToken();
                const result = await axios.get(`${requestURL}/toilet`, {
                    headers: { Authorization: `Bearer ${idToken}` }
                });
                const newRecords = result.data.map((item: any) => ({
                    Id: item.id,
                    Description: item.description,
                    Created_at: item.created_at,
                    Length_time: item.length_time,
                    Location_at: item.location_at,
                    Feeling: item.feeling
                }));
                newRecords.sort(
                    (a: Record, b: Record) =>
                        new Date(b.Created_at).getTime() - new Date(a.Created_at).getTime()
                );
                setRecords(newRecords);
            }
        } catch (error) {
            console.error('データ取得に失敗しました', error);
        }
    }, []);

    useEffect(() => {
        if (recordsUpdated) {
            fetchData();
            setRecordsUpdated(false);
        }
    }, [recordsUpdated, fetchData]);

    const handleAddOrEdit = () => {
        setRecordsUpdated(true);
    };

    const toggleOverlayMaking = () => {
        setIsOverlayVisibleMaking(!isOverlayVisibleMaking);
        handleAddOrEdit();
    };

    const toggleOverlayModify = () => {
        setIsOverlayVisibleModify(!isOverlayVisibleModify);
        handleAddOrEdit();
    };

    const handleOverlayModifyClick = (record: Record) => {
        setSelectedRecord(record);
        toggleOverlayModify();
    };

    return {
        records,
        selectedRecord,
        isOverlayVisibleMaking,
        isOverlayVisibleModify,
        toggleOverlayMaking,
        toggleOverlayModify,
        handleOverlayModifyClick,
        handleAddOrEdit
    };
}

export default useRecords;
