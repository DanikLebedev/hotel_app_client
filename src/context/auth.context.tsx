import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: (jwtToken: string, id: string, status: string, email: string) => {},
    logout: () => {},
    isAuthenticated: false,
    userStatus: '',
    userEmail: '',
});
