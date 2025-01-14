//import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const submitUserData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        await axios.post(`${apiUrl}/auth/signup`, formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res)
                navigate('/login')
            })
            .catch(err => console.log('error signing up', err.response.data.message))
    }

    return (
        <div className='form-container'>
            <h2>Sign Up</h2>
            <form id='user-sign-up' onSubmit={submitUserData}>
                <label htmlFor='email'>Email: </label>
                <input
                    className='input-field'
                    type='email'
                    name='email'
                    placeholder='enter email'
                    required
                ></input>

                <label htmlFor='password'>Password: </label>
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

export default Signup