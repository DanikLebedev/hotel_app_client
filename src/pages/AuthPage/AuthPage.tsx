import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { useHttp } from '../../hooks/http.hook';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './AuthPage.scss';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/auth.context';
import { useHistory } from 'react-router-dom';
import { LoginData, RegisterData } from '../../interfaces/clientInterfaces';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface UserData {
    token: string;
    userId: string;
    status: string;
    email: string;
    message: string;
}

const AuthPage: React.FC = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [haveAccount, setHaveAccount] = useState(true);
    const { loading, request, error, clearError } = useHttp();

    const [form, setForm] = useState<LoginData>({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState<RegisterData>({ email: '', password: '', name: '', lastName: '' });

    useEffect(() => {
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [error, clearError, haveAccount]);

    const changeHandler = (event: InputEvent): void => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const changeRegisterInputHandler = (event: InputEvent): void => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
    };

    const registerHandler = async (): Promise<void> => {
        try {
            const data: UserData = await request('/api/auth/register', 'POST', { ...registerForm });
            toaster.notify(data.message, {
                duration: 2000,
            });
            const loginData: UserData = await request('/api/auth/login', 'POST', { ...registerForm });

            auth.login(loginData.token, loginData.userId, loginData.status, loginData.email);
            history.push('/');
        } catch (e) {}
    };

    const loginHandler = async (): Promise<void> => {
        try {
            const data: UserData = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId, data.status, data.email);
            toaster.notify(data.message, {
                duration: 2000,
            });
            history.push('/');
        } catch (e) {}
    };

    const loginForm: JSX.Element = (
        <div className={haveAccount ? 'auth__wrapper login-form' : 'auth__wrapper login-form swipe-out'}>
            <h1>Log in</h1>
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
            <button className="change-form-button" onClick={() => setHaveAccount(false)}>
                Don&apos;t have an account?
            </button>
            <div className="btn__wrapper">
                <button className="auth__btn" onClick={loginHandler}>
                    Login
                </button>
            </div>
            {loading ? <Loader /> : null}
        </div>
    );

    const signInForm: JSX.Element = (
        <div className="auth__wrapper signin-form">
            <h1>Sign in</h1>
            <label>
                <FontAwesomeIcon icon={faUser} />
                <input
                    className="auth__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="e.g asd@mail.ru"
                    value={registerForm.email}
                    onChange={changeRegisterInputHandler}
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
                    value={registerForm.password}
                    onChange={changeRegisterInputHandler}
                />
            </label>
            <label>
                <FontAwesomeIcon icon={faUser} />
                <input
                    className="auth__input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="your name"
                    value={registerForm.name}
                    onChange={changeRegisterInputHandler}
                />
            </label>
            <label>
                <FontAwesomeIcon icon={faUser} />
                <input
                    className="auth__input"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="your last name"
                    value={registerForm.lastName}
                    onChange={changeRegisterInputHandler}
                />
            </label>
            <button className="change-form-button" onClick={() => setHaveAccount(true)}>
                Have an account?
            </button>
            <div className="btn__wrapper">
                <button className="auth__btn" onClick={registerHandler}>
                    Register
                </button>
            </div>
            {loading ? <Loader /> : null}
        </div>
    );
    return (
        <>
            <div className="auth"></div>
            <div className="wrapper">{haveAccount ? loginForm : signInForm}</div>
        </>
    );
};

export default AuthPage;
