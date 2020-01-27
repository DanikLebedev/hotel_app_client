import React, {useContext, useEffect, useState} from 'react'
import toaster from "toasted-notes";
import {useHttp} from "../../hooks/http.hook";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth.context";
import { useHistory } from 'react-router-dom';

type InputEvent = React.ChangeEvent<HTMLInputElement>;


const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const initState = {
        title: '',
        price: null,
        bedsQuantity: null,
        area: null,
        description: '',
        image: ''
    }

    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState(initState)

    useEffect( () => {
        toaster.notify(error, {
            duration: 2000
        });
        clearError()
    }, [error, clearError]);

    const changeHandler = (event: InputEvent): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const addCategoryHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/createCategory', 'POST', {...form, count: 1}, {
                Authorization: `Bearer ${auth.token }`
            })
            toaster.notify(data.message, {
                duration: 2000
            })
            history.push(`/orders`)
        } catch (e) {
        }
    }


    return (
        <div>
            <h1>Create Page</h1>
           <div>
                <input type="text" name='title' id='title' placeholder='title' onChange={changeHandler}/>
                <input type="number" name='price' id='price' placeholder='price' onChange={changeHandler}/>
                <input type="text" name='description' id='description' placeholder='description'
                       onChange={changeHandler}/>
                <input type="text" name='image' id='image' placeholder='image' onChange={changeHandler}/>
                <input type="number" name='bedsQuantity' id='bedsQuantity' placeholder='bedsQuantity'
                       onChange={changeHandler}/>
                <input type="number" name='area' id='area' placeholder='area' onChange={changeHandler}/>
                <button onClick={addCategoryHandler}>Add category</button>
               {loading? <Loader/> : null}
           </div>
        </div>
    )
}

export default CreatePage