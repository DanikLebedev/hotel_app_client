import { createContext } from 'react';
import { Article, Category, Comment, Employee, Feedback, OrderCart, Room } from '../interfaces/clientInterfaces';

export interface AdminContext {
    token: string | null;
    userId: string | null;
    loginUser: (jwtToken: any, id: any, status: any, email: any) => void;
    logoutUser: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    fetchedRooms: Room[];
    fetchedFeedbacks: Feedback[];
    fetchedCategories: Category[];
    fetchedAllOrders: OrderCart[];
    fetchedAllEmployee: Employee[];
    userEmail: string;
    fetchedAllArticles: Article[];
    fetchedComments: Comment[];
}

function noop(): void {}

export const AdminContext = createContext<AdminContext>({
    token: null,
    userId: null,
    userEmail: '',
    loginUser: noop,
    logoutUser: noop,
    isAuthenticated: false,
    userStatus: '',
    fetchedCategories: [
        {
            title: '',
        },
    ],
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
            food: '',
            beds: 0
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
    fetchedAllOrders: [
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
            title: ''
        },
    ],
    fetchedAllEmployee: [{ email: '', password: '', status: '' }],
    fetchedAllArticles: [{ title: '', image: '', text: '', createdAt: '' }],
    fetchedComments: [
        {
            text: '',
            userEmail: '',
            articleId: '',
        },
    ],
});
