// src/layouts/DashboardLayout.jsx
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../components/sidebar/Sidebar";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";


const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut()
            Swal.fire('Success', 'Log out success!', 'success')
            navigate('/login')
        } catch (error) {
            Swal.fire('Logout Failed', error.message, 'error')
        } finally {
            // setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-base-100">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "block" : "hidden"
                    } md:block transition-all duration-300`}
            >
                <Sidebar handleLogout={handleLogout} user={user} />
            </div>

            {/* Content */}
            <div className="flex-1">
                {/* Topbar Toggle (for md and down) */}
                <div className="md:hidden flex justify-between items-center px-4 py-2 border-b bg-base-200">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h1 className="text-lg font-semibold text-primary">Dashboard</h1>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
