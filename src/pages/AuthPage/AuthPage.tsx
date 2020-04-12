import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './AuthPage.scss';
import Loader from '../../components/Loader/Loader';
import { ClientContext } from '../../context/client.context';
import { useHistory } from 'react-router-dom';
import { Data, LoginData, RegisterData, UserData } from '../../interfaces/clientInterfaces';
import { AuthService } from '../../APIServices/authService';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../components/ErrorsComponents/ErrorMessage';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type FormData = {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
};

const AuthPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const auth: ClientContext = useContext(ClientContext);
    const [haveAccount, setHaveAccount] = useState<boolean>(true);
    const [resetForm, setResetForm] = useState({ email: '' });
    const [forgotPassword, setForgotPassword] = useState(false);

    const [form, setForm] = useState<LoginData>({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState<RegisterData>({ email: '', password: '', name: '', lastName: '' });

    const { register, handleSubmit, errors } = useForm<FormData>();

    const changeResetHandler = (event: InputEvent): void => {
        setResetForm({ ...resetForm, [event.target.name]: event.target.value });
    };

    const resetHandler = async (): Promise<void> => {
        const response = await fetch('/api/client/reset', {
            method: 'POST',
            body: JSON.stringify(resetForm),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: Data = await response.json();
        setForgotPassword(false);
        toaster.notify(data.message, {
            duration: 2000,
        });
    };

    const changeHandler = (event: InputEvent): void => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const changeRegisterInputHandler = (event: InputEvent): void => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
    };

    const registerHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const data: UserData = await AuthService.registerUser(registerForm, {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            const loginData: UserData = await AuthService.loginUser(registerForm, {
                'Content-Type': 'application/json',
            });
            setLoading(false);
            auth.loginUser(loginData.token, loginData.userId, loginData.status, loginData.email);
            history.push('/');
        } catch (e) {}
    };

    const loginHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const data: UserData = await AuthService.loginUser(form, {
                'Content-Type': 'application/json',
            });
            setLoading(false);
            if (!data.token) {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            } else {
                auth.loginUser(data.token, data.userId, data.status, data.email);
                history.push('/');
            }
        } catch (e) {}
    };

    const loginForm: JSX.Element = (
        <div className={haveAccount ? 'auth__wrapper login-form' : 'auth__wrapper login-form swipe-out'}>
            <h1>Log in</h1>
            <button className="change-form-button" onClick={() => setHaveAccount(false)}>
                Don&apos;t have an account?
            </button>
            <label>
                <FontAwesomeIcon icon={faUser} />
                <input
                    className="auth__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="e.g asd@mail.ru"
                    onChange={changeHandler}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
            </label>
            <ErrorMessage error={errors.email} type={'error'} />
            <label>
                <FontAwesomeIcon icon={faLock} />
                <input
                    className="auth__input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={changeHandler}
                    ref={register({ required: true, minLength: 6 })}
                />
            </label>
            <ErrorMessage error={errors.password} type={'error'} />
            <button className="change-form-button mb-3" onClick={() => setForgotPassword(true)}>
                Reset password
            </button>
            <div className="btn__wrapper">
                <button className="button btn-black" onClick={handleSubmit(loginHandler)}>
                    Login
                </button>
            </div>
        </div>
    );

    const forgotPasswordForm: JSX.Element = (
        <div className="auth__wrapper signin-form">
            <h1>Enter your email </h1>
            <button className="change-form-button" onClick={() => setForgotPassword(false)}>
                Go back
            </button>
            <label>
                <FontAwesomeIcon icon={faUser} />
                <input
                    className="auth__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="e.g asd@mail.ru"
                    onChange={changeResetHandler}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
            </label>

            <div className="btn__wrapper">
                <button className="button btn-black" onClick={handleSubmit(resetHandler)}>
                    Send email
                </button>
            </div>
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
                    onChange={changeRegisterInputHandler}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
            </label>
            <ErrorMessage error={errors.email} type={'error'} />
            <label>
                <FontAwesomeIcon icon={faLock} />
                <input
                    className="auth__input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={changeRegisterInputHandler}
                    ref={register({ required: true, minLength: 6 })}
                />
            </label>
            <ErrorMessage error={errors.password} type={'error'} />
            <label>
                <FontAwesomeIcon icon={faUserEdit} />
                <input
                    className="auth__input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="your name"
                    onChange={changeRegisterInputHandler}
                    ref={register({ required: true })}
                />
            </label>
            <ErrorMessage error={errors.name} type={'error'} />
            <label>
                <FontAwesomeIcon icon={faEdit} />
                <input
                    className="auth__input"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="your last name"
                    onChange={changeRegisterInputHandler}
                    ref={register({ required: true })}
                />
            </label>
            <ErrorMessage error={errors.lastName} type={'error'} />
            <button className="change-form-button" onClick={() => setHaveAccount(true)}>
                Have an account?
            </button>
            <div className="btn__wrapper">
                <button className="button btn-black" onClick={handleSubmit(registerHandler)}>
                    Register
                </button>
            </div>
        </div>
    );
    return (
        <>
            <div className="auth" />
            <div className="wrapper">
                {loading ? <Loader /> : forgotPassword ? forgotPasswordForm : haveAccount ? loginForm : signInForm}
            </div>
        </>
    );
};

export default AuthPage;
