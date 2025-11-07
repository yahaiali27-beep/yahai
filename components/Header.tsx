
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { logout, language, setLanguage, t } = context;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4" />
            </svg>
            <h1 className="text-2xl font-bold text-text-primary ms-3">{t('appName')}</h1>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div>
              <label htmlFor="language-select" className="sr-only">{t('language')}</label>
              <select
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="en">{t('english')}</option>
                <option value="ar">{t('arabic')}</option>
              </select>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
