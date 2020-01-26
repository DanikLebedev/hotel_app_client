import React, {useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {useHttp} from "../../hooks/http.hook";
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './AuthPage.scss'
import Loader from '../../components/Loader/Loader';
import {AuthContext} from "../../context/auth.context";

type InputEvent = React.ChangeEvent<HTMLInputElement>;


const AuthPage = () => {

    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        toaster.notify(error, {
            duration: 2000
        })
        clearError()
    }, [error, clearError])

    const changeHandler = (event: InputEvent): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            toaster.notify(data.message, {
                duration: 2000
            })
        } catch (e) {
            
        }
    }

    const loginHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            toaster.notify(data.message, {
                duration: 2000
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='auth'>
            <div className="wrapper">
                <div className="auth__wrapper">
                    <h1>Authorization</h1>
                    <label><FontAwesomeIcon icon={faUser}/>
                        <input className='auth__input'
                               type="text"
                               name='email'
                               id='email'
                               placeholder='e.g asd@mail.ru'
                               onChange={changeHandler}/></label>
                    <label><FontAwesomeIcon icon={faLock}/>
                        <input className='auth__input'
                               type="password"
                               name='password' id='password'
                               placeholder='password'
                               onChange={changeHandler}/></label>
                    <div className="btn__wrapper">
                        <button className='auth__btn' onClick={loginHandler}>Login</button>
                        <button className='auth__btn' onClick={registerHandler} disabled={loading}>Registration</button>
                    </div>
                    {loading? <Loader/>: null}
                </div>

            </div>
        </div>
    )
}

export default AuthPage