import React, {useContext, useEffect, useState} from 'react'
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import toaster from "toasted-notes";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const AuthAdminPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        toaster.notify(error, {
            duration: 2000
        });
        clearError()
    }, [error, clearError]);

    const changeHandler = (event: InputEvent): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.status)
            toaster.notify(data.message, {
                duration: 2000
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <h3>AuthAdmin</h3>
            <input type="text" onChange={changeHandler} name='email'/>
            <input type="password" onChange={changeHandler} name='password'/>
            <button onClick={loginHandler}>Login</button>
        </>
    )


}