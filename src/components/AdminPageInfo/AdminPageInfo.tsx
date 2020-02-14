import React, { useCallback, useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
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
    Search,
    Resize,
} from '@syncfusion/ej2-react-grids';
import { Category, Customer, Order, OrderCarts, Orders, Room, OrderCart } from '../../interfaces/clientInterfaces';
import { CategoryService } from '../../APIServices/categoryService';
import { CustomerService } from '../../APIServices/customerService';
import { RoomService } from '../../APIServices/roomService';
import '../../pages/AdminPage/AdminPage.scss';
import { config } from '../../config';
import { AuthContext } from '../../context/auth.context';
import { OrderService } from '../../APIServices/orderService';

export const AdminPageInfo: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedCustomer, setFetchedCustomers] = useState<Customer[]>([]);
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);

    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const fetchOrders = useCallback(() => {
        OrderService.getAllOrders().then(({ orders }) => setOrders(orders));
    }, []);

    const fetchRoom = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

    const gridTemplate = (props: any): any => {
        const src = config.baseUrl + props.image;
        return (
            <div
                className="room-img"
                style={{ background: `url("${src}") center center / cover`, height: '100px' }}
            ></div>
        );
    };

    useEffect(() => {
        fetchCategories();
        fetchRoom();
        fetchOrders();
    }, [fetchCategories, fetchRoom, fetchOrders]);

    const editOptions: EditSettingsModel = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Dialog',
        showDeleteConfirmDialog: true,
    };

    console.log(fetchedCategories);
    const toolBarOptions: ToolbarItems[] = ['Edit', 'Delete', 'Update', 'Cancel', 'Add', 'Search'];

    async function orderActions(state: any) {
        if (state.requestType === 'save') {
            console.log('add', state.data);
        } else if (state.requestType === 'delete') {
            const formData = new FormData();
            formData.append('_id', state.data[0]._id);
            await OrderService.deleteAdminOrder(formData).then(data => console.log(data));
        }
    }

    async function roomActions(state: any) {
        if (state.requestType === 'save') {
            console.log('add', state.data);
        } else if (state.requestType === 'delete') {
            const formData = new FormData();
            formData.append('_id', state.data[0]._id);
            await RoomService.deleteRoom(formData).then(data => console.log(data));
        }
    }


    async function categoryActions(state: any) {
        if (state.requestType === 'save') {
            const body = { title: state.data.title };
            await CategoryService.postCategory(body, {
                'Content-Type': 'application/json',
            });
        } else if (state.requestType === 'delete') {
            console.log(state.data);
            const formData = new FormData();
            formData.append('_id', state.data._id);
            await CategoryService.deleteCategory(formData).then(data => console.log(data));
        } else if (state.requestType === 'beginEdit') {
            console.log(state);
        }
    }

    return (
        <Container>
            <div className="d-flex justify-content-around flex-wrap">
                <GridComponent
                    className="mt-3"
                    dataSource={fetchedCategories}
                    allowPaging={true}
                    pageSettings={{ pageSize: 6 }}
                    allowFiltering={true}
                    allowGrouping={true}
                    width={500}
                    editSettings={editOptions}
                    toolbar={toolBarOptions}
                    actionComplete={categoryActions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="title" headerText="category" textAlign="Left" width="30" />
                    </ColumnsDirective>
                    <Inject services={[Page, Group, Edit, Toolbar, Search, Resize]} />
                </GridComponent>
                <GridComponent
                    className="mt-3"
                    dataSource={fetchedRooms}
                    width="100%"
                    allowPaging={true}
                    pageSettings={{ pageSize: 6 }}
                    allowFiltering={true}
                    allowGrouping={true}
                    editSettings={editOptions}
                    toolbar={toolBarOptions}
                    actionComplete={roomActions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="title" headerText="title" textAlign="Center" width="120" />
                        <ColumnDirective
                            field="category"
                            headerText="category"
                            dataSource={fetchedCategories}
                            textAlign="Center"
                            width="120"
                        />
                        <ColumnDirective field="price" headerText="price" textAlign="Center" width="120" />
                        <ColumnDirective
                            field="area"
                            headerText="area"
                            editType="numericedit"
                            textAlign="Center"
                            width="120"
                        />
                        <ColumnDirective
                            field="guests"
                            headerText="guests"
                            editType="numericedit"
                            textAlign="Center"
                            width="120"
                        />
                        <ColumnDirective
                            field="rooms"
                            headerText="rooms"
                            editType="numericedit"
                            textAlign="Center"
                            width="120"
                        />
                        <ColumnDirective
                            field="image"
                            headerText="image"
                            textAlign="Center"
                            width="120"
                            template={gridTemplate}
                        />
                        <ColumnDirective
                            field="isBooked"
                            headerText="booked"
                            displayAsCheckBox={true}
                            editType="booleanedit"
                            textAlign="Center"
                            width="120"
                        />
                        <Inject services={[Page, Filter, Group, Edit, Toolbar, Resize]} />
                    </ColumnsDirective>
                </GridComponent>
                <GridComponent
                    className="mt-3"
                    dataSource={orders}
                    width={'80%'}
                    allowPaging={true}
                    pageSettings={{ pageSize: 6 }}
                    allowFiltering={true}
                    editSettings={editOptions}
                    toolbar={toolBarOptions}
                    allowGrouping={true}
                    actionComplete={orderActions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="_id" headerText="OrderID" textAlign="Left" width="50" />
                        <ColumnDirective field="category" headerText="Room category" textAlign="Left" width="50" />
                        <ColumnDirective
                            field="checkIn"
                            headerText="checkIn"
                            editType="datepickeredit"
                            textAlign="Left"
                            width="50"
                            type="date"
                            format="yMd"
                        />
                        <ColumnDirective
                            field="checkOut"
                            headerText="checkOut"
                            editType="datepickeredit"
                            textAlign="Left"
                            width="50"
                            type="date"
                            format="yMd"
                        />
                        <ColumnDirective field="userEmail" headerText="userEmail" textAlign="Left" width="50" />
                        <ColumnDirective field="status" headerText="status" textAlign="Left" width="50" />
                        <Inject services={[Page, Filter, Group, Edit, Toolbar, Resize]} />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </Container>
    );
};
