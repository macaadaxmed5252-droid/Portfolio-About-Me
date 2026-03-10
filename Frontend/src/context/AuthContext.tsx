import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface Admin {
    id: string;
    email: string;
    profileImage?: string;
}

interface AuthContextType {
    admin: Admin | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ─── On mount, check if already logged in ─────────────────────────────────
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authAPI.getMe();
                setAdmin(res.data.admin);
            } catch {
                setAdmin(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authAPI.login({ email, password });
        // Store token as fallback for non-cookie environments
        if (res.data.token) {
            localStorage.setItem('adminToken', res.data.token);
        }
        setAdmin(res.data.admin);
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } finally {
            localStorage.removeItem('adminToken');
            setAdmin(null);
        }
    };

    return (
        <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
