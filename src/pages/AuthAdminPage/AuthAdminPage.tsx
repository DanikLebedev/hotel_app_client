import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useHttp } from '../../hooks/http.hook';
import toaster from 'toasted-notes';
import './AuthAdminPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const AuthAdminPage = () => {
    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();
    const [form, setForm] = useState({ email: '', password: '' });

    useEffect(() => {
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [error, clearError]);

    const changeHandler = (event: InputEvent): void => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/login', 'POST', { ...form });
            auth.login(data.token, data.userId, data.status, data.email);
            toaster.notify(data.message, {
                duration: 2000,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="auth-admin">
            <div className="auth-admin-form">
                <h1 className="text-center">Admin Authorization</h1>
                <label>
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        className="auth__input"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="e.g asd@mail.ru"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        className="auth__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </label>
                <button className="button btn-black" onClick={loginHandler}>
                    Login
                </button>
            </div>
        </div>
    );
};
