// // app/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Login from '../components/Login';
// import styles from './page.module.css';
// import Sidebar from '@/components/Sidebar';
// import ChatInterface from '@/components/ChatInterface';

// export default function Home() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [stats, setStats] = useState({ total_vector_count: 0 });

//   useEffect(() => {
//     // Check if already authenticated
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setAuthenticated(true);
//       fetchStats();
//     }
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await fetch('/api/stats', {
//         headers: {
//           'Authorization': `Basic ${localStorage.getItem('authToken')}`
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setStats(data);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleLogin = (token) => {
//     localStorage.setItem('authToken', token);
//     setAuthenticated(true);
//     fetchStats();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setAuthenticated(false);
//   };

//   if (!authenticated) {
//     return <Login onLogin={handleLogin} />;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainLayout}>
//         <Sidebar
//           stats={stats}
//           onLogout={handleLogout}
//           onUploadSuccess={fetchStats}
//           onWipeSuccess={fetchStats}
//         />
//         <ChatInterface />
//       </div>
//     </div>
//   );
// }

// app/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { Menu } from "lucide-react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import ChatInterface from "../components/ChatInterface";
// import Login from "../components/Login";
// import { redirect } from "next/navigation";

// export default function Home() {
//   const { isLoaded, isSignedIn } = useUser();
//   const [activeTab, setActiveTab] = useState("home");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ total_vector_count: 0 });
//   const [uploading, setUploading] = useState(false);
//   const [wipeConfirm, setWipeConfirm] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const { user } = useUser();

//   useEffect(() => {
//     if (isSignedIn) {
//       fetchStats();
//     }
//   }, [isSignedIn]);

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("/api/stats");
//       if (response.ok) {
//         const data = await response.json();
//         setStats(data);
//       }
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!user?.id) {
//     redirect("/sign-in");
//   }

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     setUploadMessage("");

//     try {
//       // const token = localStorage.getItem('authToken');
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch("/api/upload-csv", {
//         method: "POST",
//         headers: {
//           // 'Authorization': `Basic ${token}`
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUploadMessage(data.message);
//         fetchStats();
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       setUploadMessage("Error uploading file");
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
//       const response = await fetch("/api/wipe-database", {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchStats();
//         setWipeConfirm(false);
//         alert("Database wiped successfully!");
//       } else {
//         throw new Error("Wipe failed");
//       }
//     } catch (error) {
//       alert("Error wiping database");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />

//       <div className="flex flex-1">
//         <Sidebar
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           stats={stats}
//           onUploadSuccess={fetchStats}
//           onWipeSuccess={fetchStats}
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//         />

//         <main className="flex-1 p-4 lg:p-6">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden mb-4 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           {activeTab === "home" && <ChatInterface />}
//           {activeTab === "analytics" && (
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold mb-4">Analytics</h2>
//               <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg max-w-md">
//                 <h3 className="text-xl font-semibold mb-4">
//                   📊 Knowledge Base Stats
//                 </h3>
//                 <p className="text-lg">
//                   <strong>Total FAQs Uploaded:</strong>{" "}
//                   {stats.total_vector_count.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           )}

//           {activeTab === "settings" && (
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold mb-4">Settings</h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-6">
//                 Use the sidebar to manage your documents and database.
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-2">
//                     📊 Upload FAQ Documents
//                   </h3>
//                   <input
//                     type="file"
//                     id="csv-upload"
//                     accept=".csv"
//                     onChange={handleFileUpload}
//                     disabled={uploading}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="csv-upload"
//                     className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-md cursor-pointer transition-colors disabled:opacity-50"
//                   >
//                     {uploading ? "Uploading..." : "Choose CSV File"}
//                   </label>

//                   {uploadMessage && (
//                     <p
//                       className={`mt-2 text-sm ${
//                         uploadMessage.includes("Error")
//                           ? "text-red-500"
//                           : "text-green-500"
//                       }`}
//                     >
//                       {uploadMessage}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-2">
//                     🗃️ Database Management
//                   </h3>
//                   <button
//                     onClick={handleWipeDatabase}
//                     className={`w-full py-2 px-4 rounded-md transition-colors ${
//                       wipeConfirm
//                         ? "bg-red-600 hover:bg-red-700 text-white"
//                         : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
//                     }`}
//                   >
//                     {wipeConfirm ? "Click again to confirm" : "Wipe Database"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total_vector_count: 0 });
  const [uploading, setUploading] = useState(false);
  const [wipeConfirm, setWipeConfirm] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      fetchStats();
    }
  }, [isSignedIn]);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // Will redirect via useEffect
  }

  const handleFileUpload = async (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(data.message);
        fetchStats();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setUploadMessage("Error uploading file");
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
      const response = await fetch("/api/wipe-database", {
        method: "DELETE",
      });

      if (response.ok) {
        fetchStats();
        setWipeConfirm(false);
        alert("Database wiped successfully!");
      } else {
        throw new Error("Wipe failed");
      }
    } catch (error) {
      alert("Error wiping database");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="flex flex-1">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={stats}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 lg:p-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
          >
            <Menu className="w-5 h-5" />
          </button>

          {activeTab === "home" && <ChatInterface />}
          {activeTab === "analytics" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  📊 Knowledge Base Stats
                </h3>
                <p className="text-lg">
                  <strong>Total FAQs Uploaded:</strong>{" "}
                  {stats.total_vector_count.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use the sidebar to manage your documents and database.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    📊 Upload FAQ Documents
                  </h3>
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
                    {uploading ? "Uploading..." : "Choose CSV File"}
                  </label>

                  {uploadMessage && (
                    <p
                      className={`mt-2 text-sm ${
                        uploadMessage.includes("Error")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {uploadMessage}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    🗃️ Database Management
                  </h3>
                  <button
                    onClick={handleWipeDatabase}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                      wipeConfirm
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {wipeConfirm ? "Click again to confirm" : "Wipe Database"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}