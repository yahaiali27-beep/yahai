
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Transaction } from '../types';

export const getFinancialAdvice = async (transactions: Transaction[], language: 'en' | 'ar'): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return language === 'ar' ? "مفتاح API غير مهيأ. يرجى التحقق من الإعدادات." : "API key is not configured. Please check the setup.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const languageInstruction = language === 'ar' 
      ? "Please provide the advice in Arabic." 
      : "Please provide the advice in English.";

    const prompt = `
      Analyze the following personal financial transactions and provide actionable, concise, and easy-to-understand advice.
      The user wants to improve their financial health, save more money, and identify potential issues.
      Focus on spending patterns, income vs. expense balance, and categorization.
      Present the advice in a friendly and encouraging tone. Use markdown for formatting (e.g., lists, bold text).
      ${languageInstruction}

      Here are the transactions in JSON format:
      ${JSON.stringify(transactions, null, 2)}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching financial advice from Gemini API:", error);
    return language === 'ar' ? "عذرًا، حدث خطأ أثناء إنشاء النصيحة المالية." : "Sorry, an error occurred while generating financial advice.";
  }
};
