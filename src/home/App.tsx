import React from 'react';
import './App.css';
import OverlayRecord from './OverlayRecord';
import OverlayModify from './OverlayModify';
import RecordTable from '../RecordTable';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import useRecords from '../useRecords';

function App() {
  const [user] = useAuthState(auth);
  const {
    records,
    selectedRecord,
    isOverlayVisibleMaking,
    isOverlayVisibleModify,
    toggleOverlayMaking,
    toggleOverlayModify,
    handleOverlayModifyClick,
    handleAddOrEdit
  } = useRecords();

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!user) {
      navigate('/login'); // 未ログインの場合リダイレクト
    } else {
      handleAddOrEdit(); // ログイン後データを取得
    }
  }, [user, location, navigate, handleAddOrEdit]);

  return (
    <div className="App">
      <h2>トイレ履歴</h2>
      {user ? (
        <>
          <div className="button-container">
            <button className="Record_Button" onClick={toggleOverlayMaking}>記録</button>
            {isOverlayVisibleMaking && <OverlayRecord onClose={toggleOverlayMaking} />}
          </div>
          <RecordTable records={records} onModifyClick={handleOverlayModifyClick} />
          {selectedRecord && isOverlayVisibleModify && (
            <OverlayModify
              onClose={toggleOverlayModify}
              id={selectedRecord.Id}
              init_date={selectedRecord.Created_at}
              init_val={selectedRecord.Feeling.toString()}
              init_time={selectedRecord.Length_time.toString()}
              init_location={selectedRecord.Location_at}
              init_description={selectedRecord.Description}
            />
          )}
        </>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}

export default App;
