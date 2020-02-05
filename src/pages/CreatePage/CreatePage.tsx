import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from 'react'
import toaster from "toasted-notes";
import {useHttp} from "../../hooks/http.hook";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth.context";

type InputEvent = React.ChangeEvent<HTMLInputElement>;


const CreatePage = () => {
    // const history = useHistory()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [postCategories, setPostCategories] = useState({})
    const [fetchedStatuses, setFetchedStatuses] = useState([])
    const [employeeForm, setEmployeeForm] = useState({})

    const fetchCategories = useCallback(async () => {
        const {categories} = await request('/api/admin/category', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setFetchedCategories(categories)
    }, [auth.token, request])


    const fetchStatuses = useCallback(async () => {
        const {statuses} = await request('/api/admin/status', 'GET')
        setFetchedStatuses(statuses)
    }, [request])


    useEffect(() => {
        toaster.notify(error, {
            duration: 2000
        });
        fetchCategories()
        fetchStatuses()
        clearError()
    }, [error, clearError, fetchStatuses, fetchCategories]);

    const categoryChangeHandler = (event: InputEvent): void => {
        setPostCategories({...postCategories, [event.target.name]: event.target.value})
    }


    const employeeChangeHandler = (event: InputEvent): void => {
        setEmployeeForm({...employeeForm, [event.target.name]: event.target.value})
    }


    const selectEmployeeChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setEmployeeForm({...employeeForm, status: event.target.value})
    }

    const addCategoryHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/category', 'POST', {...postCategories}, {
                Authorization: `Bearer ${auth.token}`
            })
            toaster.notify(data.message, {
                duration: 2000
            })
            //             // history.push(`/orders`)
        } catch (e) {
        }
    }


    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await fetch('/api/admin/room', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        toaster.notify(data.message, {
            duration: 2000
        })
    }

    const addEmployeeHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/employee', 'POST', {...employeeForm}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            toaster.notify(data.message, {
                duration: 2000
            })
            // history.push(`/orders`)
        } catch (e) {
        }
    }


    const options = fetchedCategories.map(({title}, index) => {
        return (
            <option key={title + index} value={title}>{title}</option>
        )
    })

    const statusOptions = fetchedStatuses.map(({title}) => {
        return (
            <option key={title} value={title}>{title}</option>
        )
    })

    return (
        <div>
            <h1>Create Page</h1>
            <div>
                <h3>create category</h3>
                <input type="text" name='title' id='title' placeholder='title' onChange={categoryChangeHandler}/>
                <button onClick={addCategoryHandler}>Add category</button>
                {loading ? <Loader/> : null}
            </div>
            <div>
                <h3>create room</h3>
                <form onSubmit={addRoomHandler}>
                    <select name="category" id="categories">
                        {options}
                    </select>
                    <input type="text" name='title' id='title' placeholder='title'
                    />
                    <input type="number" name='price' id='price' placeholder='price'/>
                    <input type="number" name='guests' id='guests' placeholder='guests'/>
                    <input type="text" name='description' id='description' placeholder='description'
                    />
                    <input type="file" name='image' id='image' placeholder='image'/>
                    <input type="number" name='rooms' id='rooms' placeholder='rooms'
                    />
                    <input type="number" name='area' id='area' placeholder='area'/>
                    <button>Add category</button>
                </form>
                {loading ? <Loader/> : null}
            </div>
            <div>
                <h3>create employee</h3>
                <input onChange={employeeChangeHandler} type="text" name='email' id='email' placeholder='email'/>
                <input onChange={employeeChangeHandler} type="password" name='password' id='password'
                       placeholder='password'/>
                <select onChange={selectEmployeeChangeHandler} name="statuses" id="statuses">
                    {statusOptions}
                </select>
                <button onClick={addEmployeeHandler}>Add employee</button>
                {loading ? <Loader/> : null}
            </div>
        </div>
    )
}

export default CreatePage

