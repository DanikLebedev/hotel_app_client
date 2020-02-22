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

export interface Room extends Object {
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
