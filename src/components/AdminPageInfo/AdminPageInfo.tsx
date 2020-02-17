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
import { Category, Customer, Employee, Order, Room } from '../../interfaces/clientInterfaces';
import { CategoryService } from '../../APIServices/categoryService';
import { RoomService } from '../../APIServices/roomService';
import '../../pages/AdminPage/AdminPage.scss';
import { config } from '../../config';
import { AuthContext } from '../../context/auth.context';
import { OrderService } from '../../APIServices/orderService';
import { EmployeeService } from '../../APIServices/employeeService';
import toaster from 'toasted-notes';

export const AdminPageInfo: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [employee, setEmployee] = useState<Employee[]>([]);

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const fetchOrders: CallableFunction = useCallback(() => {
        OrderService.getAllOrders().then(({ orders }) => setOrders(orders));
    }, []);

    const fetchRoom: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

    const fetchEmployee: CallableFunction = useCallback(() => {
        EmployeeService.getAllEmployee().then(({ employees }) => setEmployee(employees));
    }, []);

    const gridTemplate = (props: Room): JSX.Element => {
        const src: string = config.baseUrl + props.image;
        return (
            <>
                <div
                    className="room-img"
                    style={{ background: `url("${src}") center center / cover`, height: '100px' }}
                ></div>
            </>
        );
    };

    useEffect(() => {
        fetchCategories();
        fetchRoom();
        fetchOrders();
        fetchEmployee();
    }, [fetchCategories, fetchRoom, fetchOrders, fetchEmployee]);

    const editOptions: EditSettingsModel = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Dialog',
        showDeleteConfirmDialog: true,
    };

    const toolBarOptions: ToolbarItems[] = ['Edit', 'Delete', 'Update', 'Cancel', 'Add', 'Search'];

    async function orderActions(state: any): Promise<void> {
        if (state.requestType === 'save') {
            console.log('add', state.data);
        } else if (state.requestType === 'delete') {
            const formData = new FormData();
            formData.append('_id', state.data[0]._id);
            await OrderService.deleteAdminOrder(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        }
    }

    async function roomActions(state: any): Promise<void> {
        if (state.action === 'add') {
        } else if (state.requestType === 'delete') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data[0]._id);
            await RoomService.deleteRoom(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        } else if (state.action === 'edit') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data._id);
            formData.append('category', state.data.category);
            formData.append('title', state.data.title);
            formData.append('price', state.data.price);
            formData.append('guests', state.data.guests);
            formData.append('rooms', state.data.rooms);
            formData.append('image', state.data.image);
            formData.append('isBooked', state.data.isBooked);
            await RoomService.updateRoom(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        }
    }

    async function categoryActions(state: any): Promise<void> {
        if (state.action === 'add') {
            const body: {} = { title: state.data.title };
            await CategoryService.postCategory(body, {
                'Content-Type': 'application/json',
            }).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        } else if (state.requestType === 'delete') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data[0]._id);
            await CategoryService.deleteCategory(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        } else if (state.action === 'edit') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data._id);
            formData.append('title', state.data.title);
            await CategoryService.updateCategory(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        }
    }

    async function employeeActions(state: any): Promise<void> {
        if (state.action === 'add') {
            const body: {} = { status: state.data.status, password: state.data.password, email: state.data.email };
            await EmployeeService.postEmployee(body, { 'Content-Type': 'application/json' }).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        } else if (state.requestType === 'delete') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data[0]._id);
            await EmployeeService.deleteEmployee(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        } else if (state.action === 'edit') {
            const formData: FormData = new FormData();
            formData.append('_id', state.data._id);
            formData.append('status', state.data.status);
            await EmployeeService.updateEmployee(formData).then(data => {
                toaster.notify(data.message, {
                    duration: 2000,
                });
            });
        }
    }

    return (
        <Container>
            <div className="d-flex justify-content-around flex-wrap">
                <GridComponent
                    className="mt-3"
                    dataSource={fetchedCategories}
                    allowPaging={true}
                    width={'80%'}
                    pageSettings={{ pageSize: 6 }}
                    allowFiltering={true}
                    allowGrouping={true}
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
                    actionBegin={roomActions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="title" headerText="title" textAlign="Center" width="120" />
                        <ColumnDirective
                            field="category"
                            headerText="category"
                            editType="dropdownedit"
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
                    actionBegin={orderActions}
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
                <GridComponent
                    className="mt-3"
                    dataSource={employee}
                    width={'80%'}
                    allowPaging={true}
                    pageSettings={{ pageSize: 6 }}
                    allowFiltering={true}
                    editSettings={editOptions}
                    toolbar={toolBarOptions}
                    allowGrouping={true}
                    actionBegin={employeeActions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="email" headerText="email" textAlign="Left" width="50" />
                        <ColumnDirective field="password" headerText="password" textAlign="Left" width="50" />
                        <ColumnDirective
                            field="status"
                            editType="dropdownedit"
                            headerText="status"
                            textAlign="Left"
                            width="50"
                        />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </Container>
    );
};
