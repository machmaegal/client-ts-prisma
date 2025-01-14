import { Link } from 'react-router-dom';
import burgerMenu from '/burger-menu-icon.png'
import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext<AuthContextType | undefined>(AuthContext);

    return (
        <nav>
            <div id='nav-menu-container'>
                <Link to='/' className='internal-link' >Home</Link>
                {isLoggedIn && (<>
                    <Link to='/pickAndChoose' className='internal-link' >PickNChoose</Link>
                    <button onClick={logOutUser}>Logout</button>
                </>)}
            </div>

            <img id='burger-menu-icon' src={burgerMenu} />
        </nav>
    )
}

export default Navbar
