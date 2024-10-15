import { useState, useEffect, useCallback } from 'react';
import { Record } from '../types';
import { fetchToiletRecords } from '../api'

function useRecords() {
    const [records, setRecords] = useState<Record[]>([]);
    const [recordsUpdated, setRecordsUpdated] = useState<boolean>(false);
    const [isOverlayVisibleMaking, setIsOverlayVisibleMaking] = useState<boolean>(false);
    const [isOverlayVisibleModify, setIsOverlayVisibleModify] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

    const fetchData = useCallback(async () => {
        const records = await fetchToiletRecords();
        if (records != null) {
            setRecords(records)
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
