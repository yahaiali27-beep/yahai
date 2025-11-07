
import React, { useState, useContext } from 'react';
import Header from './Header';
import Summary from './Summary';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import FinancialAdvice from './FinancialAdvice';
import { Transaction } from '../types';
import { AppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
    const context = useContext(AppContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    if (!context) return null;
    const { t } = context;

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingTransaction(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingTransaction(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 md:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <Summary />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-text-primary">{t('recentTransactions')}</h2>
                                <button
                                    onClick={handleAddNew}
                                    className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    {t('addTransaction')}
                                </button>
                            </div>
                            <TransactionList onEdit={handleEdit} />
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h2 className="text-xl font-bold text-text-primary mb-4">{t('expenseBreakdown')}</h2>
                                <ExpenseChart />
                            </div>
                            <FinancialAdvice />
                        </div>
                    </div>
                </div>
            </main>
            {isFormOpen && (
                <TransactionForm
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                    transaction={editingTransaction}
                />
            )}
        </div>
    );
};

export default Dashboard;
