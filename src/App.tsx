import React, { useCallback, useEffect, useState } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { ClientContext } from './context/client.context';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Category, Employee, Feedback, Order, OrderCart, Orders, Room } from './interfaces/clientInterfaces';
import { RoomService } from './APIServices/roomService';
import { AdminContext } from './context/admin.context';
import { FeedbackService } from './APIServices/feedbackService';
import { CategoryService } from './APIServices/categoryService';
import { OrderService } from './APIServices/orderService';
import { EmployeeService } from './APIServices/employeeService';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App: React.FC = () => {
    const { login, logout, token, userId, userStatus, userEmail } = useAuth();
    const isAuthenticated = !!token;
    const routes: JSX.Element = useRoutes(isAuthenticated, userStatus);
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [fetchedFeedbacks, setFetchedFeedbacks] = useState<Feedback[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedAllOrders, setFetchedAllOrders] = useState<OrderCart[]>([]);
    const [fetchedAllEmployee, setFetchedAllEmployee] = useState<Employee[]>([]);
    const [fetchedUserOrders, setFetchedUserOrders] = useState<Order[]>([]);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>([]);

    const fetchOrdersHistory: CallableFunction = useCallback(() => {
        OrderService.getOrdersHistory({ Authorization: `Bearer ${token}` }).then(({ ordercarts }) =>
            setOrderHistory(ordercarts),
        );
    }, [token]);

    const fetchOrders: CallableFunction = useCallback(async () => {
        const { orders }: Orders = await OrderService.getUserOrders({ Authorization: `Bearer ${token}` });
        setFetchedUserOrders(orders);
    }, [token]);

    const fetchEmployee: CallableFunction = useCallback(() => {
        EmployeeService.getAllEmployee().then(({ employees }) => setFetchedAllEmployee(employees));
    }, []);

    const fetchAllOrders: CallableFunction = useCallback(() => {
        OrderService.getAllOrders().then(({ ordercarts }) => {
            setFetchedAllOrders(ordercarts);
        });
    }, []);

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const fetchFeedback: CallableFunction = useCallback(() => {
        FeedbackService.getAllFeedbacks().then(({ feedbacks }) => {
            setFetchedFeedbacks(feedbacks);
        });
    }, []);

    const fetchRoom: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

    useEffect(() => {
        fetchRoom();
        fetchFeedback();
        fetchCategories();
        fetchAllOrders();
        fetchEmployee();
        if (isAuthenticated && userStatus !== 'admin') {
            fetchOrders();
            fetchOrdersHistory();
        }
    }, [
        fetchRoom,
        fetchFeedback,
        fetchCategories,
        fetchAllOrders,
        fetchEmployee,
        fetchOrders,
        fetchOrdersHistory,
        isAuthenticated,
        userStatus,
    ]);

    if (userStatus === 'admin') {
        return (
            <AdminContext.Provider
                value={{
                    token,
                    login,
                    logout,
                    userId,
                    isAuthenticated,
                    userStatus,
                    fetchedCategories,
                    fetchedFeedbacks,
                    fetchedRooms,
                    fetchedAllOrders,
                    fetchedAllEmployee,
                }}
            >
                <AdminPage />
            </AdminContext.Provider>
        );
    }

    return (
        <ClientContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
                userStatus,
                userEmail,
                fetchedRooms,
                fetchedFeedbacks,
                fetchedCategories,
                fetchedUserOrders,
                orderHistory,
            }}
        >
            <Router>
                <Header />
                <ScrollToTop/>
                {routes}
            </Router>
            <Footer />
        </ClientContext.Provider>
    );
};
export default App;
