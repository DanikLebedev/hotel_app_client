import {createContext} from 'react'

interface AuthContext {
    token: string,
    userId: string,
    login: () => void,
    logout: () => void,
    isAuthenticated: boolean,
}


export const AuthContext = createContext({
    token: null,
    userId: null,
    login: (jwtToken: string, id: string) => {},
    logout: () => {},
    isAuthenticated: false,
})