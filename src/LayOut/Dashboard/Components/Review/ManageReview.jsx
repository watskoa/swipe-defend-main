import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



const ManageReview = () => {

    const axiosPublic = useAxiosPublic();
    const { data: reviewData = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    })

    const [showModal, setShowModal] = useState(false);
    const [reviewToUpdate, setReviewToUpdate] = useState({});

    // handel delete with sweet alert
    const handelDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            customClass: {
                container: 'custom-swal',
            },
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/reviews/${id}`);
                    refetch();
                } catch (error) {
                    console.log(error);
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    // handle update
    const openModal = (id) => {
        const review = reviewData.find((review) => review._id === id);
        setReviewToUpdate(review);
    }

    const handleUpdate = async (id) => {
        try {
            const name = document.querySelector('input[type="text"]').value;
            const details = document.querySelector('textarea').value;
            const rating = document.querySelector('input[type="number"]').value;
            const res = await axiosPublic.patch(`/reviews/${id}`, { name, details, rating });
            console.log(res.data);
            refetch();
        } catch (error) {
            console.log(error);
        }
        document.getElementById('my_modal_3').close();
    }


    return (
        <div className='-mt-22 flex flex-col items-center justify-center'>
            <h1 className='mb-4'>Manage Review</h1>
            <table className="table">
                <thead >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Review</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewData.map((review) => (
                        <tr key={review._id}>
                            <td>{review.name}</td>
                            <td>{review.details}</td>
                            <td>{review.rating}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button className="" onClick={() => document.getElementById('my_modal_3').showModal() & openModal(review._id)}><FaEdit className="text-2xl text-blue-500" /></button>
                                    <button onClick={() => handelDelete(review._id)}>
                                        <MdDeleteForever className="text-2xl border-red-300 text-red-500" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dialog modal with a close button at corner */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{reviewToUpdate.name}</h3>
                    <p className="py-4">Name: <input type="text" placeholder="Type here" className="input input-bordered w-full" defaultValue={reviewToUpdate.name} />
                    </p>

                    <p className="py-4">Details: <textarea type="text" placeholder="Type here" className="textarea textarea-bordered w-full" defaultValue={reviewToUpdate.details} />
                    </p>

                    <p className="py-4">Rating: <input type="number" maxLength="1" placeholder="Type here" className="input input-bordered w-full" defaultValue={reviewToUpdate.rating} />
                    </p>

                    <button className='btn w-auto' onClick={() => handleUpdate(reviewToUpdate._id)}>Update</button>
                </div>
            </dialog>
        </div>
    );
};

export default ManageReview;