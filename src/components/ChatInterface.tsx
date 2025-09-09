// // components/ChatInterface.js
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import styles from '../styles/ChatInterface.module.css';

// export default function ChatInterface() {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', content: 'Hello! I\'m your RAG-powered FAQ assistant' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${token}`
//         },
//         body: JSON.stringify({ message: input })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const assistantMessage = {
//           role: 'assistant',
//           content: data.answer,
//           contexts: data.contexts
//         };
//         setMessages(prev => [...prev, assistantMessage]);
//       } else {
//         throw new Error('Failed to get response');
//       }
//     } catch (error) {
//       const errorMessage = {
//         role: 'assistant',
//         content: 'Sorry, I encountered an error generating a response.'
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <h1 className={styles.mainHeader}>🤖 RAG Chatbot Demo</h1>
//       <h3>Ask questions and get answers from your knowledge base!</h3>

//       <div className={styles.messagesContainer}>
//         {messages.map((message, index) => (
//           <div key={index} className={styles.message}>
//             <div className={`${styles.messageBubble} ${styles[message.role]}`}>
//               {message.content}
              
//               {message.contexts && message.contexts.length > 0 && (
//                 <div className={styles.contexts}>
//                   <p className={styles.contextTitle}>
//                     📚 Found {message.contexts.length} relevant documents
//                   </p>
                  
//                   <details className={styles.contextDetails}>
//                     <summary>🔍 View Sources</summary>
//                     {message.contexts.map((context, i) => (
//                       <div key={i} className={styles.contextItem}>
//                         <h4>{i + 1}. {context.source}</h4>
//                         <p>
//                           {context.text.length > 300 
//                             ? `${context.text.substring(0, 300)}...` 
//                             : context.text
//                           }
//                         </p>
//                         {i < message.contexts.length - 1 && <hr />}
//                       </div>
//                     ))}
//                   </details>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {loading && (
//           <div className={styles.message}>
//             <div className={`${styles.messageBubble} ${styles.assistant}`}>
//               🤔 Searching knowledge base...
//             </div>
//           </div>
//         )}
        
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className={styles.inputForm}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask me anything about us..."
//           disabled={loading}
//           className={styles.inputField}
//         />
//         <button 
//           type="submit" 
//           disabled={loading || !input.trim()}
//           className={styles.sendButton}
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }


// components/ChatInterface.js
'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your RAG-powered FAQ assistant' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          role: 'assistant',
          content: data.answer,
          contexts: data.contexts
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error generating a response.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">💬 Chat with your Knowledge Base</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {message.content}
              
              {message.contexts && message.contexts.length > 0 && (
                <div className="mt-2 text-sm">
                  <p className="opacity-80">
                    📚 Found {message.contexts.length} relevant documents
                  </p>
                  
                  <details className="mt-1">
                    <summary className="cursor-pointer opacity-80">🔍 View Sources</summary>
                    <div className="mt-2 space-y-2">
                      {message.contexts.map((context, i) => (
                        <div key={i} className="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
                          <h4 className="font-semibold">{i + 1}. {context.source}</h4>
                          <p className="text-xs mt-1">
                            {context.text.length > 200 
                              ? `${context.text.substring(0, 200)}...` 
                              : context.text
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg">
              🤔 Searching knowledge base...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about us..."
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}