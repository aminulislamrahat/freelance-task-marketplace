import { useContext, useEffect, useState } from "react";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import LoadingSpinner from "../LoadingSpinner";


const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const [stats, setStats] = useState({
        totalItems: 0,
        myItems: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // Fetch total items
                const totalRes = await fetch(
                    `https://b11a10-server-side-aminulislamrahat.vercel.app/get/all/projects`
                );
                const totalData = await totalRes.json();

                // Fetch my items
                const myItemsRes = await fetch(
                    `https://b11a10-server-side-aminulislamrahat.vercel.app/get/project/by/${user?.uid}`
                );
                const myItemsData = await myItemsRes.json();

                setStats({
                    totalItems: totalData.length,
                    myItems: myItemsData.length,
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.uid) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-20 bg-base-100 px-4 my-20 min-h-[calc(100dvh-350px)]">
            <h2 className="text-3xl font-bold text-primary mb-6">Welcome to Your Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<FaTasks className="text-primary text-3xl" />}
                    label="Total Posted Tasks"
                    value={stats.totalItems}
                />
                <StatCard
                    icon={<FaCalendarAlt className="text-primary text-3xl" />}
                    label="My Items"
                    value={stats.myItems}
                />
            </div>

            {/* User Info */}
            <div className="mt-10 bg-base-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Logged-in User Info</h3>
                {user ? (
                    <div className="flex items-center gap-4">
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.displayName}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-lg font-bold">{user.displayName}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">User data not available</p>
                )}
            </div>

            {/* Info/Help */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Need Help Getting Started?</h3>
                <p className="text-gray-500">
                    Use the sidebar to add new tasks, manage your posts, or browse available freelance projects. Stay organized, meet deadlines, and collaborate efficiently on DoTask.
                </p>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="flex items-center gap-4">
            {icon}
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <h3 className="text-xl font-bold">{value}</h3>
            </div>
        </div>
    </div>
);

export default DashboardHome;
