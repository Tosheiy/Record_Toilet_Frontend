import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './components/home/App';
import YourTummy from './components/setting/YourTummy';
import LoginSelect from './components/login/LoginSelect';
import Navi from './Navi';
import Setting from './components/setting/Setting';
import reportWebVitals from './tmp/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <div className="Container">
        <Navi />
        <div className="Routes">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/api" element={<YourTummy />} />
            <Route path="/login" element={<LoginSelect />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();