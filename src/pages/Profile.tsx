import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import AuthForm from '../components/AuthForm';

const Profile = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { storeToken, authenticateUser } = useContext<AuthContextType | undefined>(AuthContext);

    const submitUserData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        await axios.put(`${apiUrl}/auth/update`, formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                storeToken(res.data.authToken);
                authenticateUser();
            })
            .catch(err => console.log('error updating user data', err.response.data.message))
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>update your credentials</p>
            <AuthForm submitUserData={submitUserData} />
        </div>
    )
}

export default Profile