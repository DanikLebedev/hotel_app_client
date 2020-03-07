import { createContext } from 'react';
import { Category, Employee, Feedback, OrderCart, Room } from '../interfaces/clientInterfaces';

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
    userEmail: string
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
            category: '',
            checkIn: '',
            checkOut: '',
            orderId: '',
            status: '',
            userEmail: '',
        },
    ],
    fetchedAllEmployee: [{ email: '', password: '', status: '' }],
});
