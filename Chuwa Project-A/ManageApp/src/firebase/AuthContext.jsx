import React, {createContext, useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 使用useNavigate钩子



    useEffect(() => {
        fetch('http://localhost:3000/auth', {credentials: 'include'})
            .then(response => {
                if (response.status === 401) {
                    navigate('/login'); // 使用navigate进行导航
                    return;
                }
                return response.json()
            })
            .then(data => {
                setUser(data.user);
            });
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);