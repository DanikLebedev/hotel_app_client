export interface Category {
    title: string;
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

export interface Room {
    category: string;
    userId: string;
    isBooked: boolean;
    title: string;
    price: number;
    area: number;
    guests: number;
    rooms: number;
    description: string;
    image: string;
}

export interface Employee {
    email: string;
    password: string;
    status: string;
}

export interface Employees {
    employees: Employee[];
}

export interface Customer {
    email: string;
    password: string;
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
    _id: string;
    status: string;
    price: number;
}

export interface Orders {
    orders: Order[];
}
