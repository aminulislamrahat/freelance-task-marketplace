import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../LoadingSpinner";
import ProjectCard from "../projects/ProjectCard";

export default function BrowseTaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        setLoading(true);
        let url = `https://b11a10-server-side-aminulislamrahat.vercel.app/get/all/projects?`;

        if (sortOrder) {
            url += `sort=${sortOrder}&`;
        }

        if (selectedCategory && selectedCategory !== "all") {
            url += `category=${encodeURIComponent(selectedCategory)}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setLoading(false);
            });
    }, [sortOrder, selectedCategory]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-base-200 py-20 px-4 md:px-10 lg:px-36">
            <title>Browse Tasks</title>
            <h1 className="text-5xl font-bold text-center mb-10 text-primary">
                Browse All Tasks
            </h1>
            <p className="lg:text-2xl text-center max-w-6xl mx-auto mb-10">
                Explore a wide range of freelance tasks posted by individuals and businesses looking for help. Whether you're a developer, designer, writer, or marketer — find tasks that match your skills, budget preferences, and deadlines. Bid on opportunities and grow your freelance journey with confidence.
            </p>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
                <select
                    className="select select-primary"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort by Budget</option>
                    <option value="asc">Lowest to Highest</option>
                    <option value="desc">Highest to Lowest</option>
                </select>

                <select
                    className="select select-secondary"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option disabled value="">Select Category</option>
                    <option value="all">All Tasks</option>
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Writing</option>
                    <option>Marketing</option>
                    <option>Coaching</option>
                    <option>Excel Works</option>
                    <option>Game development</option>
                    <option>Media Editing</option>
                </select>
            </div>

            {/* Task Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tasks.map((task, idx) => (
                    <Fade key={task._id} cascade damping={0.6} direction="left" delay={idx * 100}>
                        <ProjectCard task={task} />
                    </Fade>
                ))}
            </div>
        </div>
    );
}
