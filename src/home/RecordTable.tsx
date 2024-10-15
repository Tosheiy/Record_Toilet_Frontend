import React from 'react';
import { Record } from '../types';

interface RecordTableProps {
    records: Record[];
    onModifyClick: (record: Record) => void;
}

const RecordTable: React.FC<RecordTableProps> = ({ records, onModifyClick }) => {
    return (
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
                {records.map((record) => (
                    <tr key={record.Id}>
                        <td>{record.Created_at.slice(0, 16)}</td>
                        <td>{record.Feeling}</td>
                        <td>{record.Length_time}</td>
                        <td>{record.Location_at}</td>
                        <td>{record.Description}</td>
                        <td>
                            <button className="todo-button" onClick={() => onModifyClick(record)}>
                                <img src="./more-horizontal.png" alt="3点リーダー" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RecordTable;
