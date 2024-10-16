// UserApiInfo.tsx
import React from 'react';
import OverlayChecking from '../../OverlayChecking';

interface UserApiInfoProps {
    utid: string;
    apikey: string;
    onUpdate: () => void;
    onDelete: () => void;
    isOverlayVisibleCheckUpdate: boolean;
    isOverlayVisibleCheckDelete: boolean;
    ClickUpdate: () => void;
    ClickDelete: () => void;
}

const UserApiInfo: React.FC<UserApiInfoProps> = ({
    utid, apikey, onUpdate, onDelete,
    isOverlayVisibleCheckUpdate, isOverlayVisibleCheckDelete,
    ClickUpdate, ClickDelete
}) => {

    const copyButton = (elementId: string): React.MouseEventHandler<HTMLImageElement> => (event) => {
        const element = document.getElementById(elementId) as HTMLInputElement;
        if (element && element.value !== null) {
            navigator.clipboard.writeText(element.value);
        }
    };

    return (
        <div>
            <div>
                <label>
                    <span className="textbox-2-label">ID</span>
                    <input
                        type="text"
                        className="textbox-2"
                        id="utid"
                        value={utid}
                        readOnly />
                    <img src="./copy.png" alt="filter" className="button-image-copy" onClick={copyButton("utid")} />
                </label>
                <label>
                    <span className="textbox-2-label">API key</span>
                    <input
                        type="password"
                        className="textbox-2"
                        id="apikey"
                        value={apikey}
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
                        onProcess={onUpdate}
                        target='更新'
                    />
                )}
                <button className='generatekeybutton' onClick={ClickDelete}>削除</button>
                {isOverlayVisibleCheckDelete && (
                    <OverlayChecking
                        onClose={ClickDelete}
                        onProcess={onDelete}
                        target='削除'
                    />
                )}
            </div>
        </div>
    );
};

export default UserApiInfo;