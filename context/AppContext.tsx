
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Transaction, Language } from '../types';
import { translations } from '../constants';

interface AppContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [
        { id: '1', date: '2023-10-26', description: 'Salary', amount: 5000, type: 'income', category: 'Salary' },
        { id: '2', date: '2023-10-27', description: 'Groceries', amount: 150, type: 'expense', category: 'Groceries' },
        { id: '3', date: '2023-10-28', description: 'Electric Bill', amount: 75, type: 'expense', category: 'Utilities' },
        { id: '4', date: '2023-11-01', description: 'Rent', amount: 1200, type: 'expense', category: 'Rent' },
    ];
  });
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: new Date().toISOString(),
      ...transaction
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
