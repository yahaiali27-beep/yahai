
import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AppContext } from '../context/AppContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d', '#4ddbff'];

const ExpenseChart: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { transactions, t } = context;

    const data = useMemo(() => {
        const expenseData = transactions
            .filter(tx => tx.type === 'expense')
            .reduce((acc, tx) => {
                acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
                return acc;
            }, {} as { [key: string]: number });

        return Object.keys(expenseData).map(key => ({
            name: key,
            value: expenseData[key]
        }));
    }, [transactions]);
    
    if (data.length === 0) {
        return <div className="flex items-center justify-center h-64 text-text-secondary">{t('noExpenseData')}</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
