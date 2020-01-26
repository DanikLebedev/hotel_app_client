import {useCallback, useEffect, useState} from 'react'

const storageName: string = 'userData';

interface Storage {
    token: string,
    userId: string
}

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const storageData: string | null = localStorage.getItem(storageName);
        if (storageData) {
            const data: Storage = JSON.parse(storageData)
            if (data && data.token) {
                login(data.token, data.userId)
            }
        }

    }, [login])

    return {login, logout, token, userId}
}

