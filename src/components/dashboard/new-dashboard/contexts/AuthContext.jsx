// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Add this to sync with ContextProvider
    const getUser = () => user;

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id,
                    u_name: decoded.u_name,
                    email: decoded.email
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    };

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const authUser = {
            id: decoded.id,
            u_name: decoded.u_name,
            email: decoded.email,
            ...userData
        };
        setUser(authUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                checkAuthStatus,
                getUser // Expose getUser function
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);