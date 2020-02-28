import { createContext } from 'react';
import { Category, Employee, Feedback, OrderCart, Room } from '../interfaces/clientInterfaces';

export interface AdminContext {
    token: string | null;
    userId: string | null;
    login: (jwtToken: any, id: any, status: any, email: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    fetchedRooms: Room[];
    fetchedFeedbacks: Feedback[];
    fetchedCategories: Category[];
    fetchedAllOrders: OrderCart[];
    fetchedAllEmployee: Employee[];
}

function noop(): void {}

export const AdminContext = createContext<AdminContext>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
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
