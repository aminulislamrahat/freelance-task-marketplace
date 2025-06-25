import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import LoadingSpinner from '../LoadingSpinner';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { Fade } from "react-awesome-reveal";
import { BiDish } from "react-icons/bi";
import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';

const MyTaskList = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bid, setBid] = useState()
    const navigate = useNavigate();

    const fetchTasks = () => {
        fetch(`https://b11a10-server-side-aminulislamrahat.vercel.app/get/project/by/${user?.uid}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => console.error("Failed to load items:", err));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://b11a10-server-side-aminulislamrahat.vercel.app/delete/project/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data?.deletedCount) {
                            Swal.fire("Deleted!", "Your task has been deleted.", "success");
                            fetchTasks();
                        }
                    })
                    .catch((err) => console.error("Failed to delete your task", err));
            }
        });
    };

    const handleBidShow = (bidCount) => {
        setBid(bidCount)
    }

    if (loading || !user) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[calc(100vh-400px)]">
            <title>My Posted Task</title>
            <h2 className="text-3xl font-bold mb-6 text-center">My Posted Task</h2>

            <Fade direction="down" cascade>
                <h2 className="text-xl lg:text-3xl font-semibold text-center text-primary mb-6">
                    {bid ? `You bid for ${bid || 0}
                    ${bid <= 1 ? " opportunity" : " opportunities"}` : ""}
                </h2>
            </Fade>

            {data.length === 0 ? (
                <p className="text-center text-lg">You haven’t created any tasks yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-base-300 rounded-4xl text-sm">
                        <thead className="bg-base-200 text-base font-medium">
                            <tr>
                                <th>Image</th>
                                <th className="hidden lg:table-cell">Title</th>
                                <th className="hidden lg:table-cell">Category</th>
                                <th className="hidden lg:table-cell">Deadline</th>
                                <th className="hidden lg:table-cell">Budget</th>
                                <th className="hidden lg:table-cell">Created By</th>
                                <th className="lg:hidden">Details</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((task, idx) => (

                                <tr className={`border-t border-base-300 ${idx % 2 === 0 ? 'bg-base-100' : 'bg-base-300'} hover:bg-base-200 cursor-pointer`}>
                                    {/* Image Column */}
                                    <td>
                                        <img
                                            src={task.photoLink || "https://via.placeholder.com/100"}
                                            alt={task.title}
                                            className="w-20 h-16 object-cover rounded-2xl"
                                        />
                                    </td>

                                    {/* Desktop Fields */}
                                    <td className="hidden lg:table-cell">{task.title}</td>
                                    <td className="hidden lg:table-cell">{task.category}</td>
                                    <td className="hidden lg:table-cell">{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td className="hidden lg:table-cell">${task.budget}</td>
                                    <td className="hidden lg:table-cell">{task.createdByName}</td>

                                    {/* Mobile-Only: Merged Details */}
                                    <td className="lg:hidden">
                                        <div>
                                            <h3 className="font-semibold text-primary">{task.title}</h3>
                                            <p>📁 {task.category}</p>
                                            <p>📅 {new Date(task.deadline).toLocaleDateString()}</p>
                                            <p>💰 ${task.budget}</p>
                                            <p>👤 {task.createdByName}</p>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="flex gap-3 justify-center items-center">
                                            <Link to={`/task-details/${task._id}`}>
                                                <FaRegEye className="text-info hover:text-blue-600" size={20} />
                                            </Link>
                                            <FaRegEdit
                                                size={20}
                                                className="text-warning hover:text-yellow-600 cursor-pointer"
                                                onClick={() => navigate("/edit-task", { state: task })}
                                            />
                                            <RiDeleteBin6Line
                                                size={22}
                                                className="text-error hover:text-red-600 cursor-pointer"
                                                onClick={() => handleDelete(task._id)}
                                            />
                                            <BiDish
                                                size={22}
                                                className="text-error text-green-600 hover:text-green-400 cursor-pointer"
                                                onClick={() => handleBidShow(task.currentBid)}
                                            />
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyTaskList;
