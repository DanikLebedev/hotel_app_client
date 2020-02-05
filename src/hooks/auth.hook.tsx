import {useCallback, useEffect, useState} from 'react'
import {State} from "react-spring";

const storageName: string = 'userData';


interface Storage {
    adminEmail: string;
    token: string,
    userId: string
    status: string

}



export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userStatus, setUserStatus] = useState('')

    const login = useCallback((jwtToken, id, status) => {
        setToken(jwtToken);
        setUserId(id);
        setUserStatus(status)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, status: status
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserStatus('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const storageData: string | null = localStorage.getItem(storageName);
        if (storageData) {
            const data: Storage = JSON.parse(storageData)
            if (data && data.token) {
                login(data.token, data.userId, data.status)
            }
        }

    }, [login])

    return {login, logout, token, userId, userStatus}
}

