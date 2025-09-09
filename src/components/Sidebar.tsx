// // components/Sidebar.js
// 'use client';

// import { useState } from 'react';
// import styles from '../styles/Sidebar.module.css';

// export default function Sidebar({ stats, onLogout, onUploadSuccess, onWipeSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [wipeConfirm, setWipeConfirm] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState('');

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     setUploadMessage('');

//     try {
//       const token = localStorage.getItem('authToken');
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch('/api/upload-csv', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Basic ${token}`
//         },
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUploadMessage(data.message);
//         onUploadSuccess();
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       setUploadMessage('Error uploading file');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleWipeDatabase = async () => {
//     if (!wipeConfirm) {
//       setWipeConfirm(true);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch('/api/wipe-database', {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Basic ${token}`
//         }
//       });

//       if (response.ok) {
//         onWipeSuccess();
//         setWipeConfirm(false);
//         alert('Database wiped successfully!');
//       } else {
//         throw new Error('Wipe failed');
//       }
//     } catch (error) {
//       alert('Error wiping database');
//     }
//   };

//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.sidebarSection}>
//         <p className={styles.authenticated}>🔓 Authenticated</p>
//         <button onClick={onLogout} className={styles.logoutButton}>
//           🚪 Logout
//         </button>
//       </div>

//       <div className={styles.sidebarSection}>
//         <h2>📈 Database Status</h2>
//         <div className={styles.statsBox}>
//           <h4>📊 Knowledge Base Stats</h4>
//           <p><strong>Total FAQs Uploaded:</strong> {stats.total_vector_count.toLocaleString()}</p>
//         </div>
//       </div>

//       <div className={styles.sidebarSection}>
//         <h2>📊 Upload more FAQ documents</h2>
//         <input
//           type="file"
//           id="csv-upload"
//           accept=".csv"
//           onChange={handleFileUpload}
//           disabled={uploading}
//           style={{ display: 'none' }}
//         />
//         <label htmlFor="csv-upload" className={styles.uploadButton}>
//           {uploading ? 'Uploading...' : 'Choose CSV File'}
//         </label>
        
//         {uploadMessage && (
//           <p className={uploadMessage.includes('Error') ? styles.error : styles.success}>
//             {uploadMessage}
//           </p>
//         )}
//       </div>

//       <div className={styles.sidebarSection}>
//         <h2>🗃️ Database Management</h2>
//         <button 
//           onClick={handleWipeDatabase}
//           className={wipeConfirm ? styles.wipeConfirmButton : styles.wipeButton}
//         >
//           {wipeConfirm ? 'Click again to confirm' : '🗑️ Wipe Database'}
//         </button>
//       </div>
//     </div>
//   );
// }


// components/Sidebar.js
'use client';

import { useState } from 'react';
import { Home, Settings, BarChart, X } from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  onTabChange, 
  stats, 
  onUploadSuccess, 
  onWipeSuccess,
  isOpen,
  onClose 
}:any) {
  const [uploading, setUploading] = useState(false);
  const [wipeConfirm, setWipeConfirm] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const   handleFileUpload = async (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage('');

    try {
      // const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        headers: {
          // 'Authorization': `Basic ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(data.message);
        onUploadSuccess();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setUploadMessage('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleWipeDatabase = async () => {
    if (!wipeConfirm) {
      setWipeConfirm(true);
      return;
    }

    try {
      const response = await fetch('/api/wipe-database', {
        method: 'DELETE',
      });

      if (response.ok) {
        onWipeSuccess();
        setWipeConfirm(false);
        alert('Database wiped successfully!');
      } else {
        throw new Error('Wipe failed');
      }
    } catch (error) {
      alert('Error wiping database');
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tab Content */}
        {/* <div className="p-4 border-t dark:border-gray-700"> */}
          {/* {activeTab === 'analytics' && (
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">📊 Knowledge Base Stats</h3>
              <p><strong>Total FAQs Uploaded:</strong> {stats.total_vector_count.toLocaleString()}</p>
            </div>
          )} */}

          {/* {activeTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">📊 Upload FAQ Documents</h3>
                <input
                  type="file"
                  id="csv-upload"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <label 
                  htmlFor="csv-upload"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-md cursor-pointer transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Choose CSV File'}
                </label>
                
                {uploadMessage && (
                  <p className={`mt-2 text-sm ${
                    uploadMessage.includes('Error') 
                      ? 'text-red-500' 
                      : 'text-green-500'
                  }`}>
                    {uploadMessage}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">🗃️ Database Management</h3>
                <button 
                  onClick={handleWipeDatabase}
                  className={`w-full py-2 px-4 rounded-md transition-colors ${
                    wipeConfirm 
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {wipeConfirm ? 'Click again to confirm' : 'Wipe Database'}
                </button>
              </div>
            </div>
          )}
        </div> */}
      </aside>
    </>
  );
}