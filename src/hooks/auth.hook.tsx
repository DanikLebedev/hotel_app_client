import { useCallback, useEffect, useState } from 'react';

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

    const loginUser = useCallback((jwtToken, id, status, email) => {
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
    const logoutUser = useCallback(() => {
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
                loginUser(data.token, data.userId, data.status, data.email);
            }
        }
    }, [loginUser]);

    return { loginUser, logoutUser, token, userId, userStatus, userEmail };
};
