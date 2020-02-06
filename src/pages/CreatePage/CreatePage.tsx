import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from 'react'
import toaster from "toasted-notes";
import {useHttp} from "../../hooks/http.hook";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth.context";
import {CategoryService} from "../../APIServices/categoryService";
import {Category, Data, Status} from "../../interfaces/clientInterfaces";
import {StatusService} from "../../APIServices/statusService";
import {RoomService} from "../../APIServices/roomService";
import {EmployeeService} from "../../APIServices/employeeService";

type InputEvent = React.ChangeEvent<HTMLInputElement>;


const CreatePage = () => {
    // const history = useHistory()
    const auth = useContext(AuthContext)
    const {error, clearError} = useHttp()
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([])
    const [postCategories, setPostCategories] = useState({})
    const [fetchedStatuses, setFetchedStatuses] = useState<Status[]>([])
    const [employeeForm, setEmployeeForm] = useState({})



    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        const formData: FormData = new FormData(event.target)
        const response: Response = await fetch('/api/admin/room', {
            method: 'POST',
            body: formData,
        })
        const data: Data = await response.json()
        toaster.notify(data.message, {
            duration: 2000
        })
    }

    const addEmployeeHandler = async (): Promise<void> => {
        const data: Data = await EmployeeService.postEmployee({...employeeForm}, {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            })
            toaster.notify(data.message, {
                duration: 2000
            })
    }

    const addCategoryHandler = async (): Promise<void> => {
        const data: Data = await CategoryService.postCategory({...postCategories}, {
            'Authorization': `Bearer ${auth.token}`
        })
        toaster.notify(data.message, {
            duration: 2000
        })
    }




    const categoryChangeHandler = (event: InputEvent): void => {
        setPostCategories({...postCategories, [event.target.name]: event.target.value})
    }

    const employeeChangeHandler = (event: InputEvent): void => {
        setEmployeeForm({...employeeForm, [event.target.name]: event.target.value})
    }

    const selectEmployeeChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setEmployeeForm({...employeeForm, status: event.target.value})
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




    useEffect(() => {
        toaster.notify(error, {
            duration: 2000
        });
        CategoryService.getAllCategories().then(({categories}) => setFetchedCategories(categories))
        StatusService.getAllStatuses().then(({statuses}) => setFetchedStatuses(statuses))
        clearError()
    }, [error, clearError, CategoryService.getAllCategories, StatusService.getAllStatuses ]);

    if (!fetchedCategories[0] && !fetchedStatuses[0]) {
        return <Loader/>
    }

    return (
        <div>
            <h1>Create Page</h1>
            <div>
                <h3>create category</h3>
                <input type="text" name='title' id='title' placeholder='title' onChange={categoryChangeHandler}/>
                <button onClick={addCategoryHandler}>Add category</button>
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
            </div>
            <div>
                <h3>create employee</h3>
                {!statusOptions ? <Loader/>:null}
                <input onChange={employeeChangeHandler} type="text" name='email' id='email' placeholder='email'/>
                <input onChange={employeeChangeHandler} type="password" name='password' id='password'
                       placeholder='password'/>
                <select onChange={selectEmployeeChangeHandler} name="statuses" id="statuses">
                    {statusOptions}
                </select>
                <button onClick={addEmployeeHandler}>Add employee</button>
            </div>
        </div>
    )
}

export default CreatePage

