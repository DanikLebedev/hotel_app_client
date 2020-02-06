export  interface Category {
    title: string
}

export interface Categories {
    categories: Array<Category>
}

export interface Data extends Response{
    message: string
}

export interface Statuses {
    statuses: Status[]
}

export interface Status {
    title: string
}

export interface Rooms {
    rooms: Room[]
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
    email: string,
    password: string,
    status: string
}

export interface Employees {
    employees: Employee[]
}