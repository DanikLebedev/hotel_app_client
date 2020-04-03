import React, { useContext } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Label } from 'recharts';
import { AdminContext } from '../../context/admin.context';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdminPageCharts = () => {
    const allOrders = useContext(AdminContext).fetchedAllOrders;

    const filteredOrders = category => {
        return allOrders.filter(order => order.category === category);
    };

    const earningsByCategory = category => {
        return allOrders
            .filter(order => {
                return order.category === category && (order.status === 'booked' || 'completed');
            })
            .reduce((prev, next) => {
                return (prev += next.price);
            }, 0);
    };

    const data01 = [
        { name: 'De luxe', earnings: earningsByCategory('De luxe') },
        { name: 'Family', earnings: earningsByCategory('Family') },
        { name: 'President', earnings: earningsByCategory('President') },
        { name: 'Standart', earnings: earningsByCategory('Standart') },
    ];

    const data = [
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
        <div className="d-flex justify-content-around">
            <div>
                <h3>Number of Orders by category</h3>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
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
                        data={data01}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};
