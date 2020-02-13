import { useCallback, useEffect, useState } from 'react';
import { State } from 'react-spring';

const storageName = 'userData';

interface Storage {
    token: string;
    userId: string;
    status: string;
    email: string;
}

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userStatus, setUserStatus] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const login = useCallback((jwtToken, id, status, email) => {
        setToken(jwtToken);
        setUserId(id);
        setUserStatus(status);
        setUserEmail(email);
        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
                status: status,
                email: email,
            }),
        );
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserStatus('');
        setUserEmail('');
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const storageData: string | null = localStorage.getItem(storageName);
        if (storageData) {
            const data: Storage = JSON.parse(storageData);
            if (data && data.token) {
                login(data.token, data.userId, data.status, data.email);
            }
        }
    }, [login]);

    return { login, logout, token, userId, userStatus, userEmail };
};
