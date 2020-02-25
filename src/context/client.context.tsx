import { createContext } from 'react';
import { Category, Feedback, Room } from '../interfaces/clientInterfaces';

interface ClientContext {
    token: string | null;
    userId: string | null;
    login: (jwtToken: any, id: any, status: any, email: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    userEmail: string;
    fetchedRooms: Room[];
    fetchedFeedbacks: Feedback[];
    fetchedCategories: Category[];
}

function noop(): void {}

export const ClientContext = createContext<ClientContext>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
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
});
