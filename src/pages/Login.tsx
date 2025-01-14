import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';

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

    return (<div className='form-container'>
        <h2>Log In</h2>
        <form id='user-log-in' onSubmit={submitLogInData}>
            <label htmlFor='email'></label>
            <input
                className='input-field'
                type='email'
                name='email'
                placeholder='enter email'
                required
            ></input>

            <label htmlFor='password'></label>
            <input
                className='input-field'
                type='text'
                name='password'
                placeholder="enter password"
                required
            ></input>

            <input
                className="button"
                type="submit"
                value="Submit"
            ></input>

        </form>

    </div>
    )
}

export default login