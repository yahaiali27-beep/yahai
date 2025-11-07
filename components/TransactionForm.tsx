
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, transaction }) => {
  const context = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');

  if (!context) return null;
  const { addTransaction, updateTransaction, t } = context;
  
  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(String(transaction.amount));
      setDate(transaction.date);
      setType(transaction.type);
      setCategory(transaction.category);
    } else {
      // Reset form for new transaction
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setType('expense');
      setCategory('');
    }
  }, [transaction, isOpen]);
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      description,
      amount: parseFloat(amount),
      date,
      type,
      category
    };

    if (transaction) {
      updateTransaction({ ...transactionData, id: transaction.id });
    } else {
      addTransaction(transactionData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <h2 className="text-xl font-bold mb-4">{transaction ? t('editTransaction') : t('addTransaction')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('amount')}</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('date')}</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('type')}</label>
              <select value={type} onChange={e => setType(e.target.value as TransactionType)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                <option value="expense">{t('expense')}</option>
                <option value="income">{t('income')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('category')}</label>
              <select value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                <option value="">{t('selectCategory')}</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
