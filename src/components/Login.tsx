// components/Login.js
'use client';

import { useState } from 'react';
import styles from '../styles/Login.module.css';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Encode credentials for Basic Auth
      const token = btoa(`admin:${password}`);
      
      // Test authentication
      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      console.log('Auth response status:', response);

      if (response.ok) {
        onLogin(token);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginHeader}>🔐 Authentication Required</h2>
        <p>Please enter the password to access the RAG Chatbot.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? 'Loading...' : '🚀 Login'}
          </button>
        </form>
      </div>
    </div>
  );
}