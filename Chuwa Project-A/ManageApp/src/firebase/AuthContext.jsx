import React, {createContext, useState, useEffect, useContext} from 'react';
import {useNavigate, useLocation} from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 使用useNavigate钩子
    const location = useLocation();
    useEffect(() => {
        fetch('http://localhost:3000/auth', {credentials: 'include'})
            .then(response => {
                if (response.status === 401) {
                    if (location.pathname === '/products') {
                        // 只有当用户尝试访问 /products 而未登录时才重定向到 Login
                        navigate('/login');
                    }
                    return;
                }
                return response.json()
            })
            .then(data => {
                setUser(data.user);
            });
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);