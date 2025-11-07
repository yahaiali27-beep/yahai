
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getFinancialAdvice } from '../services/geminiService';

// A simple markdown parser
const Markdown: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
        .replace(/^- (.*)/gm, '<li class="ms-4">$1</li>') // List items
        .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1">$1</ul>'); // Wrap lists

    return <div className="prose prose-sm max-w-none text-text-primary" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const FinancialAdvice: React.FC = () => {
    const context = useContext(AppContext);
    const [advice, setAdvice] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    if (!context) return null;
    const { transactions, t, language } = context;

    const handleGetAdvice = async () => {
        setIsLoading(true);
        setError('');
        setAdvice('');
        try {
            const result = await getFinancialAdvice(transactions, language);
            setAdvice(result);
        } catch (err) {
            setError('Failed to get advice.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-text-primary mb-4">{t('adviceFromAI')}</h2>
            {!advice && !isLoading && (
                 <button
                    onClick={handleGetAdvice}
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400"
                >
                    {t('getFinancialAdvice')}
                </button>
            )}
           
            {isLoading && (
                <div className="text-center text-text-secondary">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p>{t('generatingAdvice')}</p>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {advice && (
                <div className="mt-4 space-y-2 text-sm">
                    <Markdown content={advice} />
                </div>
            )}
        </div>
    );
};

export default FinancialAdvice;
