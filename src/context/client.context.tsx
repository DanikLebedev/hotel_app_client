import { createContext } from 'react';
import { Article, Category, Customer, Feedback, Order, OrderCart, Room } from '../interfaces/clientInterfaces';

export interface ClientContext {
    token: string | null;
    userId: string | null;
    loginUser: (jwtToken: any, id: any, status: any, email: any) => void;
    logoutUser: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    userEmail: string;
    fetchedRooms: Room[];
    fetchedFeedbacks: Feedback[];
    fetchedCategories: Category[];
    fetchedUserOrders: Order[];
    orderHistory: OrderCart[];
    fetchedAllArticles: Article[];
    fetchedUserInfo: Customer;
}

function noop(): void {}

export const ClientContext = createContext<ClientContext>({
    token: null,
    userId: null,
    loginUser: noop,
    logoutUser: noop,
    isAuthenticated: false,
    userStatus: '',
    userEmail: '',
    fetchedRooms: [
        {
            area: 0,
            category: '',
            description: '',
            guests: 0,
            image: '',
            isBooked: false,
            price: 0,
            rooms: 0,
            title: '',
            _id: '',
        },
    ],
    fetchedFeedbacks: [
        {
            _id: '',
            userEmail: '',
            userName: '',
            userLastName: '',
            message: '',
            approved: false,
        },
    ],
    fetchedCategories: [
        {
            title: '',
        },
    ],
    fetchedUserOrders: [
        {
            category: '',
            checkIn: '',
            checkOut: '',
            guests: 0,
            _id: '',
            status: '',
            price: 0,
            comment: '',
            userEmail: '',
        },
    ],
    orderHistory: [
        {
            orderId: '',
            status: '',
            userEmail: '',
            category: '',
            checkOut: '',
            checkIn: '',
            _id: '',
            comment: '',
            guests: 0,
            userId: '',
            price: 0,
        },
    ],
    fetchedAllArticles: [{ title: '', image: '', text: '', createdAt: '' }],
    fetchedUserInfo: { email: '', lastName: '', name: '', order: [], password: '' },
});
