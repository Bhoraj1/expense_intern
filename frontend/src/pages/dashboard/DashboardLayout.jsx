import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
const DashboardLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isMinimized={isMinimized} setIsMinimized={setIsMinimized} />

        <div
          className={`transition-all duration-300 ${
            isMinimized ? "md:ml-16" : "md:ml-64"
          } ml-0`}
        >
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
