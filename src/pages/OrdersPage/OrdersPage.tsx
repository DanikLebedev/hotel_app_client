import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import './OrdersPage.scss'
import Loader from "../../components/Loader/Loader";

export const OrdersPage = () => {
    const {request, loading, error, clearError} = useHttp()
    const [categories, setCategories] = useState([])
    const auth = useContext(AuthContext)

    const template = categories.map(({title}) => {
        return (
            <option value={title}>{title}</option>
        )
    })


    return (
        <div>
            {loading? <Loader/> : null}
            <h1>Book Page</h1>
            {/*{!categories.length? <p>There no orders yet</p>: <select name="categories" id="categories">{template}</select> }*/}
        </div>
    )
}
