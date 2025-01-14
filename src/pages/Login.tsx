import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import AuthForm from '../components/AuthForm';

const login = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
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
                console.log('THE TOKEN: ', res.data.authToken)
                storeToken(res.data.authToken);
                authenticateUser();
                navigate('/')
            })
            .catch(err => console.log('error login in', err.response.data.message))
    }

    return (
        <>
            <AuthForm submitUserData={submitLogInData}></AuthForm>
        </>
    )
}

export default login