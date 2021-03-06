import React, { useCallback, useEffect, useState } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { ClientContext } from './context/client.context';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollUpButton from 'react-scroll-up-button';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AdminPage } from './pages/AdminPage/AdminPage';
import {
    Article,
    Category,
    Customer,
    Employee,
    Feedback,
    Order,
    OrderCart,
    Room,
    Comment,
    Comments,
} from './interfaces/clientInterfaces';
import { RoomService } from './APIServices/roomService';
import { AdminContext } from './context/admin.context';
import { FeedbackService } from './APIServices/feedbackService';
import { CategoryService } from './APIServices/categoryService';
import { OrderService } from './APIServices/orderService';
import { EmployeeService } from './APIServices/employeeService';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import CometChatWidget from './components/CometChatWidget/CometChatWidget';
import { ArticleService } from './APIServices/articleService';
import { CustomerService } from './APIServices/customerService';
import { CommentService } from './APIServices/commentService';

const App: React.FC = () => {
    const { loginUser, logoutUser, token, userId, userStatus, userEmail } = useAuth();
    const isAuthenticated = !!token;
    const routes: JSX.Element = useRoutes(isAuthenticated, userStatus);
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [fetchedFeedbacks, setFetchedFeedbacks] = useState<Feedback[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedAllOrders, setFetchedAllOrders] = useState<OrderCart[]>([]);
    const [fetchedAllEmployee, setFetchedAllEmployee] = useState<Employee[]>([]);
    const [fetchedUserOrders, setFetchedUserOrders] = useState<Order[]>([]);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>([]);
    const [fetchedAllArticles, setFetchedAllArticles] = useState<Article[]>([]);
    const [fetchedUserInfo, setFetchedUserInfo] = useState<Customer>({
        email: '',
        lastName: '',
        name: '',
        order: [],
        password: '',
    });
    const [fetchedComments, setFetchedComments] = useState<Comment[]>([]);

    const fetchAllArticles: CallableFunction = useCallback(() => {
        ArticleService.getAllArticles().then(({ article }) => setFetchedAllArticles(article));
    }, []);

    const fetchOrdersHistory: CallableFunction = useCallback(() => {
        OrderService.getOrdersHistory({ Authorization: `Bearer ${token}` }).then(({ ordercarts }) =>
            setOrderHistory(ordercarts),
        );
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
        CategoryService.getAllCategories({ Authorization: `Bearer ${token}` }).then(({ categories }) =>
            setFetchedCategories(categories),
        );
    }, [token]);

    const fetchFeedback: CallableFunction = useCallback(() => {
        FeedbackService.getAllFeedbacks().then(({ feedbacks }) => {
            setFetchedFeedbacks(feedbacks);
        });
    }, []);

    const fetchRoom: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

    const fetchCustomerInfo: CallableFunction = useCallback(async () => {
        if (isAuthenticated && userStatus !== 'admin') {
            const customer: Customer = await CustomerService.getCustomer({ Authorization: `Bearer ${token}` });
            setFetchedUserInfo(customer);
        }
        return null;
    }, [token]);

    const fetchAllComments: CallableFunction = useCallback(async () => {
        const { comment }: Comments = await CommentService.getAllComments();
        setFetchedComments(comment);
    }, [token]);

    useEffect(() => {
        fetchRoom();
        fetchFeedback();
        fetchCategories();
        fetchAllOrders();
        fetchEmployee();
        fetchAllArticles();
        fetchAllComments();
        if (isAuthenticated && userStatus !== 'admin') {
            fetchOrdersHistory();
            fetchCustomerInfo();
        }
    }, [
        fetchRoom,
        fetchFeedback,
        fetchCategories,
        fetchAllOrders,
        fetchEmployee,
        fetchOrdersHistory,
        isAuthenticated,
        userStatus,
        fetchAllArticles,
        fetchCustomerInfo,
        fetchAllComments,
    ]);

    if (userStatus === 'admin') {
        return (
            <AdminContext.Provider
                value={{
                    token,
                    loginUser,
                    logoutUser,
                    userId,
                    isAuthenticated,
                    userStatus,
                    userEmail,
                    fetchedCategories,
                    fetchedFeedbacks,
                    fetchedRooms,
                    fetchedAllOrders,
                    fetchedAllEmployee,
                    fetchedAllArticles,
                    fetchedComments,
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
                loginUser,
                logoutUser,
                userId,
                isAuthenticated,
                userStatus,
                userEmail,
                fetchedRooms,
                fetchedFeedbacks,
                fetchedCategories,
                fetchedUserOrders,
                orderHistory,
                fetchedAllArticles,
                fetchedUserInfo,
                fetchedComments,
            }}
        >
            <Router>
                <Header />
                {userStatus !== 'manager' && isAuthenticated ? <CometChatWidget /> : null}
                <ScrollToTop />
                {routes}
            </Router>
            <Footer />
            <ScrollUpButton
                StopPosition={0}
                ShowAtPosition={200}
                EasingType="easeOutCubic"
                AnimationDuration={500}
                ContainerClassName="ScrollUpButton__Container"
                TransitionClassName="ScrollUpButton__Toggled"
                ToggledStyle={{left: 10}}
            />
        </ClientContext.Provider>
    );
};
export default App;
