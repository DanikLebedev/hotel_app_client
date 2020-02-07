import React, {useCallback, useContext, useEffect, useState} from 'react'
import Container from "react-bootstrap/Container";
import {
    ColumnDirective,
    ColumnsDirective,
    Filter,
    GridComponent,
    Group,
    Inject,
    Page,
    Edit,
    EditSettingsModel,
    Toolbar,
    ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import {Category, Customer, Order, Orders, Room} from "../../interfaces/clientInterfaces";
import {CategoryService} from "../../APIServices/categoryService";
import {CustomerService} from "../../APIServices/customerService";
import {RoomService} from "../../APIServices/roomService";
import '../../pages/AdminPage/AdminPage.scss'






export const AdminPageInfo: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([])
    const [fetchedCustomer, setFetchedCustomers] = useState<Customer[]>([])
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([])
    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({categories}) => setFetchedCategories(categories))
    }, [])

    const fetchCustomers = useCallback(() => {
        CustomerService.getAllCustomers().then(({customers}) => setFetchedCustomers(customers))
    }, [])

    // const fetchOrders = useCallback(async () => {
    //     const {orders} = await OrderService.getAllOrders({ 'Authorization': `Bearer ${auth.token}`,})
    //     setOrders(orders)
    // }, [])

    const fetchRoom = useCallback( () => {
        RoomService.getAllRooms().then(({rooms}) => setFetchedRooms(rooms))
    },[])


    useEffect(() => {
        fetchCategories()
        fetchCustomers()
        fetchRoom()
       fetch('/api/admin/orders')
           .then((response) => response.json())
           .then(({orders}:Orders) => {
               orders.map(orderItem => {
                   orderItem.checkIn = new Date(orderItem.checkIn).toLocaleDateString()
                   orderItem.checkOut = new Date(orderItem.checkOut).toLocaleDateString()
                   return orderItem
               })
               setOrders(orders)
           })
    }, [fetchCategories, fetchCustomers, fetchRoom])

    const editOptions:EditSettingsModel = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    }

    const toolBarOptions: ToolbarItems[] = ['Edit', 'Delete', 'Update', 'Cancel', 'Add']

    const dataSourceChanged = (state: any) => {
       alert(state)
    }

    return (
        <Container>
            <div className='d-flex justify-content-around flex-wrap'>
                <GridComponent
                    className='mt-3' dataSource={fetchedCategories}
                    allowPaging={true}
                    pageSettings={{pageSize: 6}}
                    allowFiltering={true}
                    allowGrouping={true}
                    width={500}
                    editSettings={editOptions}
                    toolbar={toolBarOptions}
                    dataSourceChanged={dataSourceChanged}
                    dataStateChange={dataSourceChanged}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='_id' headerText='categoryID' format={'C2'} textAlign='Left'
                                         width='30'/>
                        <ColumnDirective field='title' headerText='category' textAlign='Left' width='30'/>
                    </ColumnsDirective>
                    <Inject services={[Page, Filter, Group, Edit, Toolbar]}/>
                </GridComponent>
                <GridComponent className='mt-3' dataSource={fetchedCustomer} width={500}>
                    <ColumnsDirective>
                        <ColumnDirective field='_id' headerText='CustomerID' textAlign='Left' width='50'/>
                        <ColumnDirective field='email' headerText='email' textAlign='Left' width='50'/>
                    </ColumnsDirective>
                </GridComponent>
                <GridComponent className='mt-3' dataSource={fetchedRooms} width='100%'
                               allowPaging={true}
                               pageSettings={{pageSize: 6}}
                               allowFiltering={true}
                               allowGrouping={true}
                               editSettings={editOptions}
                               toolbar={toolBarOptions}
                               dataSourceChanged={dataSourceChanged}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='_id' headerText='RoomID' textAlign='Center' width='120'/>
                        <ColumnDirective field='title' headerText='title' textAlign='Center' width='120'/>
                        <ColumnDirective field='category' headerText='category' editType={'dropdownedit'}  textAlign='Center' width='120'/>
                        <ColumnDirective field='price' headerText='price' textAlign='Center' width='120'/>
                        <ColumnDirective field='area' headerText='area' editType='numericedit' textAlign='Center' width='120'/>
                        <ColumnDirective field='guests' headerText='guests' editType='numericedit' textAlign='Center' width='120'/>
                        <ColumnDirective field='rooms' headerText='rooms' editType='numericedit' textAlign='Center' width='120'/>
                        <ColumnDirective field='image' headerText='image' editType='numericedit' textAlign='Center' width='120'/>
                        <ColumnDirective field='isBooked' headerText='booked' textAlign='Center' width='120'/>
                        <Inject services={[Page, Filter, Group, Edit, Toolbar]}/>
                    </ColumnsDirective>
                </GridComponent>
                <GridComponent className='mt-3' dataSource={orders} width={'80%'}
                               allowPaging={true}
                               pageSettings={{pageSize: 6}}
                               allowFiltering={true}
                               editSettings={editOptions}
                               toolbar={toolBarOptions}
                               dataSourceChanged={dataSourceChanged}
                               allowGrouping={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='_id' headerText='OrderID' textAlign='Left' width='50'/>
                        <ColumnDirective field='category' headerText='Room category' textAlign='Left' width='50'/>
                        <ColumnDirective field='checkIn' headerText='checkIn'  editType='datepickeredit'  textAlign='Left' width='50'/>
                        <ColumnDirective field='checkOut' headerText='checkOut' editType='datepickeredit'   textAlign='Left' width='50'/>
                        <ColumnDirective field='guests' headerText='guests' editType='numericedit' textAlign='Left' width='50'/>
                        <ColumnDirective field='owner' headerText='CustomerId' textAlign='Left' width='50'/>
                        <Inject services={[Page, Filter, Group, Edit, Toolbar]}/>
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </Container>
    )
}