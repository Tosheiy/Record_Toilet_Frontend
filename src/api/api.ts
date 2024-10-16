import axios from 'axios';
import { auth } from '../components/login/firebase';
import { Record } from '../types/types';

const requestURL = process.env.REACT_APP_REQUEST_URL || '';

const getIdToken = async (): Promise<string> => {
    if (auth.currentUser) {
        return await auth.currentUser.getIdToken();
    }
    return '';
};

// トイレ記録を取得する関数を追加
export const fetchToiletRecords = async (): Promise<Record[] | null> => {
    try {
        const idToken = await getIdToken();
        if (idToken) {
            const result = await axios.get(`${requestURL}/toilet`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });

            // データの整形
            const newRecords = result.data.map((item: any) => ({
                Id: item.id,
                Description: item.description,
                Created_at: item.created_at,
                Length_time: item.length_time,
                Location_at: item.location_at,
                Feeling: item.feeling
            }));

            // 作成日時でソート
            newRecords.sort(
                (a: Record, b: Record) =>
                    new Date(b.Created_at).getTime() - new Date(a.Created_at).getTime()
            );

            return newRecords;
        }

        return null
    } catch (error) {
        console.error('データ取得に失敗しました', error);
        return null;
    }
};

export const postRecord = async (recordData: any): Promise<void> => {
    const idToken = await getIdToken();
    await axios.post(`${requestURL}/toilet`, recordData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
};

export const updateRecord = async (id: string, recordData: any): Promise<void> => {
    const idToken = await getIdToken();
    await axios.put(`${requestURL}/toilet/${id}`, recordData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
};

export const deleteRecord = async (id: string): Promise<void> => {
    const idToken = await getIdToken();
    await axios.delete(`${requestURL}/toilet/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
};

// 自分のAPIキーを取得
export const fetchUser = async () => {
    const idToken = await getIdToken();
    const result = await axios.get(`${requestURL}/toilet/self`, {
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    });
    return result.data;
};

// APIキーを生成
export const generateAPIKey = async () => {
    const idToken = await getIdToken();
    const result = await axios.get(`${requestURL}/toilet/self/register`, {
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    });
    return result.data;
};

// APIキーを更新
export const updateAPIKey = async (utid: string) => {
    const idToken = await getIdToken();
    const result = await axios.put(`${requestURL}/toilet/self/${utid}`, {}, {
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    });
    return result.data;
};

// APIキーを削除
export const deleteAPIKey = async (utid: string) => {
    const idToken = await getIdToken();
    const result = await axios.delete(`${requestURL}/toilet/self/${utid}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    });
    return result.data;
};

export const pingCheck = async () => {
    const idToken = await getIdToken();
    const result = await axios.get(`${requestURL}/ping`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
    return result.data
};