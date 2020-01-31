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
    const [roomForm, setRoomForm] = useState({})
    const [fetchedStatuses, setFetchedStatuses] = useState([])
    const [employeeForm, setEmployeeForm] = useState({})

    const fetchCategories = useCallback(async () => {
        const categories = await request('/api/admin/category', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setFetchedCategories(categories)
    }, [auth.token, request])



    const fetchStatuses = useCallback(async () => {
        const statuses = await request('/api/admin/status', 'GET')
        setFetchedStatuses(statuses)
    },[request])


    useEffect( () => {
        toaster.notify(error, {
            duration: 2000
        });
        fetchCategories()
        fetchStatuses()
        clearError()
    }, [error, clearError, fetchStatuses,  fetchCategories]);

    const categoryChangeHandler = (event: InputEvent): void => {
        setPostCategories({...postCategories, [event.target.name]: event.target.value})
    }

    const roomChangeHandler =  (event: InputEvent): void => {
        setRoomForm({...roomForm, [event.target.name]: event.target.value})
        console.log(event.target.value)
    }

    const employeeChangeHandler = (event: InputEvent): void => {
        setEmployeeForm({...employeeForm, [event.target.name]: event.target.value})
    }

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setRoomForm({...roomForm, category : event.target.value})
    }

    const selectEmployeeChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setEmployeeForm({...employeeForm, status : event.target.value})
    }
    // const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    //     const file: FileList | null = event.target.files
    //     if (file) {
    //         setRoomForm({...roomForm, image:  file[0].name})
    //     }
    // }



    const addCategoryHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/category', 'POST', {...postCategories}, {
                Authorization: `Bearer ${auth.token }`
            })
            toaster.notify(data.message, {
                duration: 2000
            })
            //             // history.push(`/orders`)
        } catch (e) {
        }
    }

    const addRoomHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/room', 'POST', {...roomForm}, {
                Authorization: `Bearer ${auth.token }`
            })
            toaster.notify(data.message, {
                duration: 2000
            })
            // history.push(`/orders`)
        } catch (e) {
        }
    }

    const addEmployeeHandler = async (): Promise<void> => {
        try {
            const data = await request('/api/admin/employee', 'POST', {...employeeForm}, {
                Authorization: `Bearer ${auth.token }`
            })
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
                    <select onChange={selectChangeHandler} name="categories" id="categories">
                        {options}
                    </select>
                    <input type="text" name='title' id='title' placeholder='title'
                           onChange={roomChangeHandler}/>
                    <input type="number" name='price' id='price' placeholder='price' onChange={roomChangeHandler}/>
                    <input type="number" name='guests' id='guests' placeholder='guests' onChange={roomChangeHandler}/>
                    <input type="text" name='description' id='description' placeholder='description'  onChange={roomChangeHandler} />
                    <input type="file" name='image' id='image' placeholder='image' onChange={roomChangeHandler} />
                    <input type="number" name='rooms' id='rooms' placeholder='rooms'
                           onChange={roomChangeHandler}/>
                    <input type="number" name='area' id='area' placeholder='area' onChange={roomChangeHandler}/>
                    <button onClick={addRoomHandler}>Add category</button>
                    {loading ? <Loader/> : null}
                </div>
                <div>
                    <h3>create employee</h3>
                        <input onChange={employeeChangeHandler} type="text" name='email' id='email' placeholder='email'/>
                        <input onChange={employeeChangeHandler} type="password" name='password' id='password' placeholder='password'/>
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

