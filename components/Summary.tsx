
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Transaction } from '../types';

const Summary: React.FC = () => {
    const context = useContext(AppContext);
    const [period, setPeriod] = useState<'monthly' | 'annually'>('monthly');

    if (!context) return null;
    const { transactions, t } = context;

    const filteredTransactions = useMemo(() => {
        const now = new Date();
        return transactions.filter(tx => {
            const txDate = new Date(tx.date);
            if (period === 'monthly') {
                return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
            }
            // annually
            return txDate.getFullYear() === now.getFullYear();
        });
    }, [transactions, period]);

    const totalIncome = filteredTransactions
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpenses = filteredTransactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const net = totalIncome - totalExpenses;
    const netIsProfit = net >= 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-primary">{t('dashboard')}</h2>
                <div className="flex items-center bg-gray-200 rounded-lg p-1">
                    <button 
                        onClick={() => setPeriod('monthly')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md ${period === 'monthly' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}>
                        {t('monthly')}
                    </button>
                    <button 
                        onClick={() => setPeriod('annually')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md ${period === 'annually' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}>
                        {t('annually')}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-700">{t('totalIncome')}</p>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-700">{t('totalExpenses')}</p>
                    <p className="text-2xl font-bold text-red-900">{formatCurrency(totalExpenses)}</p>
                </div>
                <div className={`p-4 rounded-lg ${netIsProfit ? 'bg-blue-50' : 'bg-pink-50'}`}>
                    <p className={`text-sm font-medium ${netIsProfit ? 'text-blue-700' : 'text-pink-700'}`}>
                        {netIsProfit ? t('netProfit') : t('loss')}
                    </p>
                    <p className={`text-2xl font-bold ${netIsProfit ? 'text-blue-900' : 'text-pink-900'}`}>
                        {formatCurrency(net)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
