import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <main className="flex-1 p-6">
        <Outlet /> 
        {/* 👆 Yaha Members.jsx, ProfilePage.jsx, Events.jsx etc. ka content render hoga */}
      </main>
    </div>
  );
}
