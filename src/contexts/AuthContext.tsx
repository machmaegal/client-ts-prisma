import React, { useState, useEffect } from "react";
import { AuthContextType } from '../types';
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProviderWrapper(props: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(`${apiUrl}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((res) => {
                    const user = res.data;

                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((err) => {
                    console.log('token invalid', err)
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, removeToken, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
