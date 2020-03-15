export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    lastName: string;
}

export interface Category {
    title: string;
    _id?: string;
}

export interface Categories {
    categories: Array<Category>;
}

export interface Data extends Response {
    message: string;
    data?: Status[] | OrderCart[] | Room[] | Customer[] | Category[] | Feedback[];
    ordercarts?: OrderCart[];
}

export interface Statuses {
    statuses: Status[];
}

export interface Status {
    title: string;
}

export interface Rooms {
    rooms: Room[];
}

export interface Room {
    category: string;
    isBooked: boolean;
    title: string;
    price: number;
    area: number;
    guests: number;
    rooms: number;
    description: string;
    image: string;
    _id?: string;
}

export interface Employee {
    email: string;
    password: string;
    status: string;
    _id?: string;
}

export interface Employees {
    employees: Employee[];
}

export interface Customer {
    email: string;
    password: string;
    name: string;
    lastName: string;
    order: [];
    id?: string;
}

export interface Customers {
    customers: Customer[];
}

export interface Order {
    category: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    _id?: string;
    status?: string;
    price: number;
    comment: string;
    userEmail: string;
}

export interface Orders {
    orders: Order[];
}

export interface OrderCart {
    status: string;
    orderId: string;
    category: string;
    checkIn: string;
    checkOut: string;
    userEmail: string;
    _id?: string;
    userId: string;
    guests: number;
    price: number;
    comment: string;
}

export interface OrderCarts {
    ordercarts: OrderCart[];
}

export interface Feedback {
    _id?: string;
    userEmail: string;
    userName: string;
    userLastName: string;
    message: string;
    approved: boolean;
}

export interface Feedbacks {
    feedbacks: Feedback[];
}

export interface UserData {
    token: string;
    userId: string;
    status: string;
    email: string;
    message: string;
}

export interface Article {
    title: string;
    image: string;
    text: string;
    createdAt: string;
    _id?: string;
}

export interface Articles {
    article: Article[];
}
