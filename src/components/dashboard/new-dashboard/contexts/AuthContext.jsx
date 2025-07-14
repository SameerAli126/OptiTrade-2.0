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
                let userData;
                if (token === "dummy-token") {
                    userData = {
                        id: "dev-user",
                        u_name: "Developer",
                        email: "dev@example.com"
                    };
                } else {
                    const decoded = jwtDecode(token);
                    userData = {
                        id: decoded.id,
                        u_name: decoded.u_name,
                        email: decoded.email
                    };
                }

                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    };


    const login = (token, userData) => {
        localStorage.setItem("token", token);

        let authUser;
        if (token === "dummy-token") {
            // Use provided dummy data
            authUser = userData;
        } else {
            // Decode real JWT
            const decoded = jwtDecode(token);
            authUser = {
                id: decoded.id,
                u_name: decoded.u_name,
                email: decoded.email,
                ...userData
            };
        }

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