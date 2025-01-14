import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AuthContextType } from '../types'
import { Navigate } from 'react-router-dom'

const Anonymus = (props: { children: React.ReactNode }) => {
    const { isLoggedIn, isLoading } = useContext<AuthContextType | undefined>(AuthContext);

    if (isLoading) return <p>Loading ...</p>;

    if (isLoggedIn) {
        return <Navigate to="/" />;
    } else {
        return props.children;
    }
}

export default Anonymus