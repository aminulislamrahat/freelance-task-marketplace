import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Fade } from "react-awesome-reveal";
import taskTimeAnimation from "../../assets/time-lottie.json"; // Place your Lottie here
import ProjectCard from "../projects/ProjectCard";
import LoadingSpinner from "../LoadingSpinner";

export default function RecentTasksSection() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://b11a10-server-side-aminulislamrahat.vercel.app/get/recent/projects")
            .then((res) => res.json())
            .then((data) => { setTasks(data); setLoading(false); });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="bg-base-100 py-12 px-4 lg:px-24">
            <div className="max-w-11/12 mx-auto bg-base-200 rounded-4xl p-6 lg:p-12">
                {/* Header */}
                <Fade direction="down" triggerOnce>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold text-primary">Featured Tasks</h2>
                        <p className="mt-6 max-w-3xl mx-auto text-2xl">
                            Explore tasks that are closing soon. Don’t miss your opportunity to bid on urgent or time-sensitive projects.
                        </p>
                    </div>
                </Fade>

                {/* Content: Lottie + Cards */}
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-x-64 justify-between items-center">
                    {/* Lottie Animation */}
                    <Fade direction="left" >
                        <div className="w-full xl:mx-20">
                            <Lottie animationData={taskTimeAnimation} loop={true} />
                        </div>
                    </Fade>

                    {/* Cards Grid */}

                    <div className="w-full grid gap-6 xl:gap-12 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto">
                        {tasks.map((task, idx) => (
                            <Fade direction="right" delay={idx * 100} key={idx} >
                                <ProjectCard key={task._id} task={task} />
                            </Fade>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
