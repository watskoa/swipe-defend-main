import React from 'react';
import { Outlet } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageContact = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contacts = [], refetch } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact');
            return res.data;
        }
    })

    const handelDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/contact/${_id}`);
                if (res.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    refetch();
                }
            }
        })
    }

    const handelStatus = async (contacts, e) => {
        const res = await axiosSecure.patch(`/contact/${contacts._id}`, { status: e.target.value });
        toast.success('Status Updated Successfully');
        refetch();
    }
    return (
        <div className='w-full -mt-20'>
            <div className="grid grid-cols-3 justify-between">
                <div className=""></div>
                <h1 className="text-2xl font-bold">Contact Request</h1>
                <div className="flex justify-end">
                    <button className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold text-sm px-4 rounded" onClick={() => refetch()}>Refresh</button>
                </div>
            </div>
            <div className="">
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <>ID</>
                                        </label>
                                    </th>
                                    <th>Name & Phone</th>
                                    <th>Email & Message</th>
                                    <th>Status</th>
                                    <th>Created Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                contacts.map((contact, index) => (
                                    <tbody key={contact._id}>
                                        <tr>
                                            <th>
                                                <label>
                                                    <span>{index + 1}</span>
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-bold">{contact.name}</div>
                                                        <div className="text-sm opacity-50">{contact.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {contact.email}
                                                <br />
                                                <span className="badge badge-ghost badge-sm">{contact.details}</span>
                                            </td>
                                            <td>
                                                <select className="btn btn-ghost btn-xs" defaultValue={contact.status} onChange={(e) => handelStatus(contact, e)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Solved">Solved</option>
                                                    <option value="Hold">Hold</option>
                                                </select>
                                            </td>
                                            <th>
                                                <p className="btn btn-ghost btn-xs">{contact.created_at}</p>
                                            </th>
                                            <th>
                                                <button onClick={() => handelDelete(contact._id)} className="btn btn-ghost btn-xs">Delete</button>
                                            </th>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ManageContact;