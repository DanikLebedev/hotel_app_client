import React, { useContext } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    LineChart,
    Line,
} from 'recharts';
import { AdminContext } from '../../context/admin.context';
import { OrderCart } from '../../interfaces/clientInterfaces';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdminPageCharts = () => {
    const allOrders: OrderCart[] = useContext(AdminContext).fetchedAllOrders;

    const filteredOrders = category => {
        return allOrders.filter(order => order.category === category);
    };

    const earningsByCategory = (category: string) => {
        return allOrders
            .filter(order => {
                return order.category === category && (order.status === 'booked' || 'completed');
            })
            .reduce((prev, next) => {
                return (prev += next.price);
            }, 0);
    };

    const ordersByMonth = (month: number): OrderCart[] => {
        return allOrders.filter(order => {
            return new Date(order.checkIn).getMonth() === month;
        });
    };

    const filteredOrdersByMonth = [
        { name: 'Jan', orders: ordersByMonth(0).length },
        { name: 'Feb', orders: ordersByMonth(1).length },
        { name: 'Mar', orders: ordersByMonth(2).length },
        { name: 'Apr', orders: ordersByMonth(3).length },
        { name: 'May', orders: ordersByMonth(4).length },
        { name: 'Jun', orders: ordersByMonth(5).length },
        { name: 'Jul', orders: ordersByMonth(6).length },
        { name: 'Aug', orders: ordersByMonth(7).length },
        { name: 'Sep', orders: ordersByMonth(8).length },
        { name: 'Oct', orders: ordersByMonth(9).length },
        { name: 'Nov', orders: ordersByMonth(10).length },
        { name: 'Dec', orders: ordersByMonth(11).length },
    ];

    const filteredEarningsByCategory = [
        { name: 'De luxe', earnings: earningsByCategory('De luxe') },
        { name: 'Family', earnings: earningsByCategory('Family') },
        { name: 'President', earnings: earningsByCategory('President') },
        { name: 'Standart', earnings: earningsByCategory('Standart') },
    ];

    const filteredOrdersByCategory = [
        {
            name: 'De luxe',
            orders: filteredOrders('De luxe').length,
        },
        {
            name: 'President',
            orders: filteredOrders('President').length,
        },
        {
            name: 'Standart',
            orders: filteredOrders('Standart').length,
        },
        {
            name: 'Family',
            orders: filteredOrders('Family').length,
        },
    ];
    return (
        <div className="admin-page-charts-wrapper">
            <div>
                <h3>Number of Orders by category</h3>
                <BarChart
                    width={600}
                    height={300}
                    data={filteredOrdersByCategory}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
            </div>
            <div>
                <h3>Earnings in $ by category</h3>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="earnings"
                        isAnimationActive={false}
                        data={filteredEarningsByCategory}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {filteredEarningsByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
            <div>
                <h3>Numbers of orders by month</h3>
                <LineChart
                    width={800}
                    height={300}
                    data={filteredOrdersByMonth}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};
