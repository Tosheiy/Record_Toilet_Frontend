import { Link } from 'react-router-dom';
import './Navi.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../login/firebase';
import { UserInfo, SignOutButton, SignInButton } from '../login/Login'


function Navi() {
    const [user] = useAuthState(auth)

    return (
        <nav className='Navi_Navigation'>
            <h3 className="Navi_Main">RecordToilet</h3>
            <Link to="/home" className='Navi_Link'>
                <img src="./home.png" alt="home" className='Navi_LinkImage' />
                <span className='Navi_LinkText'>Home</span>
            </Link>
            <Link to="/api" className='Navi_Link'>
                <img src="./search.png" alt="あなたのお腹" className='Navi_LinkImage' />
                <span className='Navi_LinkText'>あなたのお腹</span>
            </Link>
            <div className='Navi_UserSection'>
                {user ? (
                    <div>
                        <UserInfo />
                        <SignOutButton />
                    </div>
                ) : (
                    <SignInButton />
                )
                }
            </div>
        </nav>
    );
}

export default Navi;
