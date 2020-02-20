import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
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
import { Category, Employee, Order } from '../../interfaces/clientInterfaces';
import { CategoryService } from '../../APIServices/categoryService';
import '../../pages/AdminPage/AdminPage.scss';
import { AuthContext } from '../../context/auth.context';
import { OrderService } from '../../APIServices/orderService';
import { EmployeeService } from '../../APIServices/employeeService';
import toaster from 'toasted-notes';
import { RoomDataGrid } from '../RoomDataGrid/RoomDataGrid';

export const AdminPageInfo: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [employee, setEmployee] = useState<Employee[]>([]);

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const fetchOrders: CallableFunction = useCallback(() => {
        OrderService.getAllOrders().then(({ orders }) => setOrders(orders));
    }, []);

    const fetchEmployee: CallableFunction = useCallback(() => {
        EmployeeService.getAllEmployee().then(({ employees }) => setEmployee(employees));
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchOrders();
        fetchEmployee();
    }, [fetchCategories, fetchOrders, fetchEmployee]);

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
            <Tabs defaultActiveKey="category" id="uncontrolled-tab-example">
                <Tab eventKey="category" title="Categories">
                    <GridComponent
                        className="mt-3"
                        dataSource={fetchedCategories}
                        allowPaging={true}
                        pageSettings={{ pageSize: 6 }}
                        allowFiltering={true}
                        allowGrouping={true}
                        width={800}
                        editSettings={editOptions}
                        toolbar={toolBarOptions}
                        actionComplete={categoryActions}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="title" headerText="category" textAlign="Left" width="30" />
                        </ColumnsDirective>
                        <Inject services={[Page, Group, Edit, Toolbar, Search, Resize]} />
                    </GridComponent>
                </Tab>
                <Tab eventKey="rooms" title="Rooms">
                    <RoomDataGrid />
                </Tab>
                <Tab eventKey="orders" title="Orders">
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
                </Tab>
                <Tab title={'Employees'} eventKey="employees">
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
                </Tab>
            </Tabs>
        </Container>
    );
};
