//import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Signup = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

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
        <>
            <h2>Sign Up</h2>
            <AuthForm submitUserData={submitUserData}></AuthForm>
            <Link to='/login' >Go to LogIn </Link>
        </>
    )
}

export default Signup