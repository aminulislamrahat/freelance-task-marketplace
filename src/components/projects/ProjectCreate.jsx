import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../LoadingSpinner';
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import taskAnimation from "../../assets/task-lottie.json";

const ProjectCreate = ({ existingTask }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const newTask = Object.fromEntries(formData.entries())
        // console.log(newTask);

        const newObject = { ...newTask, "createdByUserID": user?.uid, "currentBid": existingTask ? existingTask?.currentBid : "0" }
        // console.log("newObject", newObject);

        const url = existingTask
            ? `https://b11a10-server-side-aminulislamrahat.vercel.app/edit/project/${existingTask._id}` // for update
            : "https://b11a10-server-side-aminulislamrahat.vercel.app/create-project"; // for add

        const method = existingTask ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(newObject)
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data after fetch call", data)
                if (data?.insertedId || data?.modifiedCount || (existingTask ? data?.matchedCount : null)) {
                    Swal.fire({
                        icon: 'success',
                        title: existingTask ? "Task Updated!" : "Task Added!",
                        text: `You have successfully ${existingTask ? "update" : "create"} your task.`,
                        confirmButtonColor: '#6366f1'
                    });
                    setLoading(false);
                    navigate("/my-task")
                    // e.target.reset();
                }
            })
            .catch((err) => console.error("Failed to load items:", err));


    };

    if (!user) return <LoadingSpinner />;

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-end gap-10 px-4 md:px-10 lg:px-36 py-20 mx-auto">
            <title>{existingTask ? "Edit Task" : "Add Task"}</title>
            <Fade direction="left">
                <div className="w-full mx-auto">
                    <Lottie animationData={taskAnimation} loop={true} />
                </div>
            </Fade>

            <Fade direction="right">
                <div className="card w-full lg:w-xl xl:w-2xl shadow-lg bg-base-300 ml-auto p-10">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        {existingTask ? "Edit Task" : "Add New Task"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <input
                            type="text"
                            name="title"
                            defaultValue={existingTask?.title || ""}
                            placeholder="Task Title"
                            className="input input-bordered w-full"
                            required
                        />

                        <select
                            name="category"
                            defaultValue={existingTask?.category || ""}
                            className="select select-bordered w-full"
                            required
                        >
                            <option disabled value="">
                                Select Category
                            </option>
                            <option>Web Development</option>
                            <option>Design</option>
                            <option>Writing</option>
                            <option>Marketing</option>
                            <option>Coaching</option>
                            <option>Excel Works</option>
                            <option>Game development</option>
                            <option>Media Editing</option>
                        </select>

                        <textarea
                            name="description"
                            defaultValue={existingTask?.description || ""}
                            placeholder="Task Description"
                            className="textarea textarea-bordered w-full"
                            required
                        ></textarea>

                        <input
                            type="date"
                            name="deadline"
                            defaultValue={existingTask?.deadline ? new Date(existingTask.deadline).toISOString().split("T")[0] : ""}
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="number"
                            name="budget"
                            defaultValue={existingTask?.budget || ""}
                            placeholder="Budget in USD"
                            className="input input-bordered w-full"
                            min={0}
                            required
                        />

                        <input
                            type="text"
                            name="photoLink"
                            defaultValue={existingTask?.photoLink || ""}
                            placeholder="Task Photo Link"
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="text"
                            name="createdByName"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                        />
                        <input
                            type="email"
                            name="createdByEmail"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full rounded-2xl"
                        >
                            {loading
                                ? existingTask
                                    ? "Updating..."
                                    : "Submitting..."
                                : existingTask
                                    ? "Update Task"
                                    : "Add Task"}
                        </button>
                    </form>
                </div>
            </Fade>
        </div>
    );

};

export default ProjectCreate;
