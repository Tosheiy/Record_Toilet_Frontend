import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import OverlayRecord from './OverlayRecord';
import OverlayModify from './OverlayModify';
import { auth } from '../login/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const [user] = useAuthState(auth);
  const [records, setRecords] = useState<Record[]>([]);
  const [recordsUpdated, setRecordsUpdated] = useState<boolean>(false);
  const [isOverlayVisibleMaking, setIsOverlayVisibleMaking] = useState<boolean>(false);
  const [isOverlayVisibleModify, setIsOverlayVisibleModify] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  type Record = {
    Id: string;
    Description: string;
    Created_at: string;
    Length_time: number;
    Location_at: string;
    Feeling: number;
  };

  const requestURL = process.env.REACT_APP_REQUEST_URL;

  useEffect(() => {
    if (recordsUpdated && user) {

      const fetchData = async () => {

        // データ取得の処理など
        try {
          // トークンを取得する
          let idToken = '';
          if (auth.currentUser) {
            idToken = await auth.currentUser.getIdToken();
          }

          const result = await axios.get(requestURL + "/toilet", {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          })
          let newRecords: Record[] = [];
          if (result.data !== null) {
            newRecords = result.data.map((item: any) => ({
              Id: item.id,
              Description: item.description,
              Created_at: item.created_at,
              Length_time: item.length_time,
              Location_at: item.location_at,
              Feeling: item.feeling,
            }));
            // Created_atで降順ソート
            newRecords.sort((a: { Created_at: string | number | Date; }, b: { Created_at: string | number | Date; }) => new Date(b.Created_at).getTime() - new Date(a.Created_at).getTime());
            console.log(newRecords)
          };
        } catch (error) {
          console.log('失敗');
          console.log(error);
        }

      }
      fetchData();
      setRecordsUpdated(false); // データ取得後にフラグをリセット
      
    }
  }, [recordsUpdated]);

  const handleAddOrEdit = async () => {
    setRecordsUpdated(true); // 追加または編集後にフラグを立てる
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

  useEffect(() => {
    handleAddOrEdit();
  }, []); // 空の依存配列で一度だけ実行

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const runAsyncFunction = async () => {
      if (!user) {
        navigate("/login"); // ログインしていない場合にリダイレクト\
      }
      else {
        await waitForOneSecond();
        await handleAddOrEdit();
      }
    };

    runAsyncFunction();
  }, [location]);

  const waitForOneSecond = () => {
    return new Promise(resolve => setTimeout(resolve, 100));
  };

  return (
    <div className="App">
      <h2>トイレ履歴</h2>
      {user ? (
        <div>
          <div className="button-container">
            <button className="Record_Button" onClick={toggleOverlayMaking}>記録</button>
            {isOverlayVisibleMaking && <OverlayRecord onClose={toggleOverlayMaking} />}
            <div className="container">
              <button className="img-button">
                <img src="./filter.png" alt="filter" className="button-image" />
                <p className="button-text">Filter</p>
              </button>
            </div>
          </div>
          <table className="todo-table">
            <thead>
              <tr>
                <th>日時</th>
                <th>評価</th>
                <th>トイレ時間</th>
                <th>場所</th>
                <th>説明</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.Id}>
                  <td>{record.Created_at.slice(0, 16)}</td>
                  <td>{record.Feeling}</td>
                  <td>{record.Length_time}</td>
                  <td>{record.Location_at}</td>
                  <td >{record.Description}</td>
                  <td><button className="todo-button" onClick={() => handleOverlayModifyClick(record)}>
                    <img src="./more-horizontal.png" alt='3点リーダー' /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRecord && isOverlayVisibleModify && (
            <OverlayModify
              onClose={toggleOverlayModify}
              id={selectedRecord.Id.toString()}
              init_date={selectedRecord.Created_at.slice(0, 16)}
              init_val={selectedRecord.Feeling.toString()}
              init_time={selectedRecord.Length_time.toString()}
              init_location={selectedRecord.Location_at}
              init_description={selectedRecord.Description}
            />
          )}
        </div>
      ) : (
        <p>ログインしてください</p>
      )}

    </div>
  );
}

export default App;