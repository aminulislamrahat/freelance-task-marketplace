import { FaTasks, FaUserTie, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";

const DashboardHome = () => {
    return (
        <div className="space-y-20 bg-base-100  px-4 my-20 min-h-[calc(100dvh-350px)]">
            <h2 className="text-3xl font-bold text-primary mb-6">Welcome to Your Dashboard</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <FaTasks className="text-primary text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Total Posted Tasks</p>
                            <h3 className="text-xl font-bold">24</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <FaCalendarAlt className="text-primary text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Upcoming Deadlines</p>
                            <h3 className="text-xl font-bold">6</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <FaUserTie className="text-primary text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Total Bids</p>
                            <h3 className="text-xl font-bold">42</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <FaLayerGroup className="text-primary text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Categories</p>
                            <h3 className="text-xl font-bold">8</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Info */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Need Help Getting Started?</h3>
                <p className="text-gray-500">
                    Use the sidebar to add new tasks, manage your posts, or browse available freelance projects. Stay organized, meet deadlines, and collaborate efficiently on DoTask.
                </p>
            </div>
        </div>
    );
};

export default DashboardHome;
