import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import { Link } from 'react-router-dom';

function Home() {
    const { isLoggedIn } = useContext<AuthContextType | undefined>(AuthContext);

    return (
        <>
            <p>yada yadda sth sth explain whats what</p>
            <p>yada yadda sth sth explain whats what</p>
            {!isLoggedIn && (
                <>
                    <Link to="/signup"> <button>Sign Up</button> </Link>
                    <Link to="/login"> <button>Login</button> </Link>
                </>
            )}
        </>
    )
}

export default Home
