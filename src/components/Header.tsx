// components/Header.js
'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { isSignedIn } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        🤖 RAG Chatbot Demo
      </h1>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link
            href="/sign-in"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}