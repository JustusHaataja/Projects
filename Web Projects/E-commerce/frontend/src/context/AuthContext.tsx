import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as authApi from '../api/auth';

interface AuthContextType {
    user: authApi.User | null;
    loading: boolean;
    login: (credentials: authApi.LoginCredentials) => Promise<void>;
    register: (data: authApi.RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<authApi.User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const user = await authApi.getCurrentUser();
            setUser(user);
        } catch (error) {
            // Not logged in
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: authApi.LoginCredentials) => {
        await authApi.login(credentials);
        await checkUser();
    };

    const register = async (data: authApi.RegisterData) => {
        await authApi.register(data);
        // Optionally auto-login after register, or redirect to login
        // For now, let's assume register doesn't auto-login unless backend does it.
        // Backend register just returns success message.
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
