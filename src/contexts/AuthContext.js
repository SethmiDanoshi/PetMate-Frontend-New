import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    //? check for token
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (response) => {
        sessionStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);

        setUser({
            token: response.data.token,
            fullName : response.data.fullName,
            email : response.data.email,
            role : response.data.role
        });
        navigate('/');
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/SignIn');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
  }