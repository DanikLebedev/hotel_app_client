import React, { useContext, useState } from 'react';
import toaster from 'toasted-notes';
import './AuthAdminPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../APIServices/authService';
import { UserData } from '../../interfaces/clientInterfaces';
import { ErrorMessage } from '../../components/ErrorsComponents/ErrorMessage';
import { useForm } from 'react-hook-form';
import Loader from '../../components/Loader/Loader';
import { ClientContext } from '../../context/client.context';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type AdminFormData = {
    email: string;
    password: string;
};

export const AuthAdminPage = () => {
    const { register, handleSubmit, errors } = useForm<AdminFormData>();
    const auth: ClientContext = useContext(ClientContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const changeHandler = (event: InputEvent): void => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const data: UserData = await AuthService.loginAdmin(form, {
                'Content-Type': 'application/json',
            });
            auth.loginUser(data.token, data.userId, data.status, data.email);
            setLoading(false);
            if (data.status === 'admin') {
                history.push('/admin/info');
            } else if (data.status === 'manager') {
                history.push('/');
            }
            toaster.notify(data.message, {
                duration: 2000,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="auth-admin" />
            <div className="auth-admin-wrapper">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="auth-admin-form">
                        <h1 className="text-center">Admin Login</h1>
                        <label>
                            <FontAwesomeIcon icon={faUser} />
                            <input
                                className="auth__input"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="e.g asd@mail.ru"
                                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                                onChange={changeHandler}
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
                                ref={register({ required: true, minLength: 6 })}
                                onChange={changeHandler}
                            />
                        </label>
                        <ErrorMessage error={errors.password} type={'error'} />

                        <button className="button btn-black" onClick={handleSubmit(loginHandler)}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
