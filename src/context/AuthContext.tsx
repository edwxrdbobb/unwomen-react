// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phoneNo: string;
    // Add other user properties as needed
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserInfo(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await fetch('https://unwomenmarketplace.online/userinfo', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data: User = await response.json();
            setUser(data); // Set user info
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};