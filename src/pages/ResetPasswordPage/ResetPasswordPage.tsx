import React, { ChangeEvent, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import toaster from 'toasted-notes';
import { ErrorMessage } from '../../components/ErrorsComponents/ErrorMessage';

type FormData = {
    password: string;
};

export const ResetPasswordPage = () => {
    const [resetPassword, setResetPassword] = useState<{ password: string; token?: string }>({
        password: '',
        token: '',
    });
    const params: { token?: string } = useParams();
    const token: string | undefined = params.token;
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm<FormData>();

    const changeResetHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setResetPassword({ ...resetPassword, [event.target.name]: event.target.value, token });
    };
    const resetHandler = async (): Promise<void> => {
        const response = await fetch('/api/client/password', {
            method: 'POST',
            body: JSON.stringify(resetPassword),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        history.push('/auth')
        toaster.notify(data.message, {
            duration: 2000,
        });
    };

    return (
        <>
            <div className="auth" />
            <div className="wrapper">
                <div className="auth__wrapper signin-form">
                    <h1>Enter new password</h1>
                    <label>
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            className="auth__input"
                            type="text"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={changeResetHandler}
                            ref={register({ required: true, minLength: 6 })}
                        />
                    </label>
                    <ErrorMessage error={errors.password} type={'error'} />
                    <div className="btn__wrapper">
                        <button className="button btn-black" onClick={handleSubmit(resetHandler)}>
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
