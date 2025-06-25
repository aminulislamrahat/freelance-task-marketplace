import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import bidAnimation from "../../assets/bid-lottie.json";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import ErrorHandleComponent from "../ErrorHandleComponent";

export default function ProjectDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch task

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://b11a10-server-side-aminulislamrahat.vercel.app/get/project/by/projectId/${id}`)
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Something went wrong');
                }
                return res.json();
            })
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err.message);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    console.log("error", error)

    const handleBid = async () => {
        const currentBid = Number(task?.currentBid || 0) + 1;

        const res = await fetch(`https://b11a10-server-side-aminulislamrahat.vercel.app/project/bid/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentBid }),
        });

        const result = await res.json();

        if (result.modifiedCount > 0) {
            setTask((prev) => ({ ...prev, currentBid }));
            Swal.fire({
                icon: "success",
                title: "Bid Successful!",
                text: "You have placed a bid on this task.",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            Swal.fire("Error", "Failed to place bid", "error");
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error === 'Invalid task ID') {

        return <ErrorHandleComponent message="Invalid Task ID. Please check the URL." textColor="text-red-500" />


    }

    if (error === 'Task not found') {
        return <ErrorHandleComponent message="Task not found. It may have been deleted." textColor="text-yellow-500" />


    }

    if (error) {
        return <ErrorHandleComponent message="Something went wrong. Please try again later." textColor="text-red-400" />

    }


    return (
        <div className="bg-base-200 py-20 px-4 lg:px-24">
            <title>{`Details | ${task?.title}`}</title>
            <Fade direction="down" cascade>
                <h2 className="text-xl lg:text-3xl font-semibold text-center text-primary mb-6">
                    {user?.uid == task?.createdByUserID ? `You Task got ${task.currentBid || 0}
                    ${task.currentBid <= 1 ? " bid" : " bids"}` : `You bid for ${task.currentBid || 0}
                    ${task.currentBid <= 1 ? " opportunity" : " opportunities"}`} .
                </h2>
            </Fade>


            <div className="max-w-5xl mx-auto bg-base-100 shadow-lg rounded-4xl px-8 lg:px-20 pb-8 space-y-6">
                {/* Lottie Animation */}
                <div className="w-full flex justify-center">
                    <div className="w-60 lg:w-96">
                        <Lottie animationData={bidAnimation} loop={true} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={task.photoLink || "https://via.placeholder.com/400x300"}
                        alt={task.title}
                        className="w-full md:w-1/2 h-64 object-cover rounded-2xl"
                    />

                    <div className="flex-1 space-y-2 bg-base-300 p-8 rounded-2xl">
                        <h1 className="text-3xl font-bold text-primary">{task.title}</h1>
                        <p className="text-gray-500 text-sm">
                            Category: <span className="font-medium">{task.category}</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Budget: <span className="font-medium">${task.budget}</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Deadline:{" "}
                            <span className="font-medium">
                                {new Date(task.deadline).toLocaleDateString()}
                            </span>
                        </p>
                        <p className="text-gray-600 text-sm">
                            Posted by:{" "}
                            <span className="font-medium">
                                {task.createdByName}
                            </span>
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-lg font-medium mt-4 mb-2">Description:</p>
                    <p className="text-gray-500 whitespace-pre-line">{task.description}</p>
                </div>

                <div className="text-center pt-4">
                    <button
                        onClick={handleBid}
                        className="btn btn-primary w-full md:w-1/2 rounded-2xl"
                        disabled={user?.uid == task?.createdByUserID}
                    >
                        Bid Now
                    </button>
                </div>
            </div>

        </div>
    );
}
