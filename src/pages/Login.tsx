import axios from 'axios'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import AuthForm from '../components/AuthForm';

const login = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext<AuthContextType | undefined>(AuthContext);

    const submitLogInData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        await axios.post(`${apiUrl}/auth/login`, formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                storeToken(res.data.authToken);
                authenticateUser();
                navigate('/')
            })
            .catch(err => console.log('error login in', err.response.data.message))
    }

    return (
        <>
            <h2>Log In</h2>
            <AuthForm submitUserData={submitLogInData}></AuthForm>
            <Link to='/signup' >Go to SignUp</Link>
        </>
    )
}

export default login