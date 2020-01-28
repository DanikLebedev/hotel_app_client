import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import './OrdersPage.scss'
import Loader from "../../components/Loader/Loader";

export const OrdersPage = () => {
    const {request, loading, error, clearError} = useHttp()
    const [orders, setOrders] = useState([])
    const auth = useContext(AuthContext)


    const fetchOrders = useCallback(async () => {
        const orders = await request('/api/orders', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setOrders(orders)
    }, [auth.token, request])



    const deleteCountHandler = (id: string) =>  {
       setOrders(orders.filter((item: {_id: string}) => {
         return item._id !== id
       }))

    }

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])


    const table = (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Category</th>
                <th>Price</th>
                <th>description</th>
                <th>bedsQuantity</th>
                <th>image</th>
                <th>area</th>
                <th>count</th>
                <th>date</th>
            </tr>
            </thead>
            <tbody>
            {orders.length ?  orders.map((order: any, index: number) => {
                return (
                    <tr key={index + order}>
                        <td>{index + 1}</td>
                        <td>{order.title}</td>
                        <td>{order.price}</td>
                        <td>{order.description}</td>
                        <td>{order.bedsQuantity}</td>
                        <td><img src={order.image} alt="img" style={{width: '400px', height: '200px'}}/></td>
                        <td>{order.area}</td>
                        <td>{order.count}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>
                            <button>Add</button>
                        </td>
                        <td>
                            <button onClick={() => deleteCountHandler(order._id)}>delete</button>
                        </td>
                    </tr>
                )
            }): null}

            </tbody>
        </table>

    )

    return (
        <div>
            {loading? <Loader/> : null}
            <h1>Book Page</h1>
            {!orders.length? <p>There no orders yet</p>: table }
        </div>
    )
}
