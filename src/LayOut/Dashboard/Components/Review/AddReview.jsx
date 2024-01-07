import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

// Image Hosting
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddReview = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const [image, setImage] = useState();

    // Remove the unused uploadImage function
    async function uploadImage(imageFile) {
        if (!imageFile) return;

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const imageRes = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });

            const imageData = await imageRes.json();
            return imageData.data.display_url;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const addReview = async (data) => {
        try {
            data.image = await uploadImage(image);
            console.log(data);
            const res = await axiosPublic.post('/reviews', data);
            console.log(res);
            Swal.fire({
                title: 'Success!',
                text: 'Review added!',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            reset();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };

    return (
        <div className='-mt-20'>
            <div className="">
                <h2>Add Reviews</h2>
            </div>

            <div className="divider"></div>

            <form onSubmit={handleSubmit(addReview)} className="">
                <p className="py-4 ">
                    Name: <input
                        className="bg-indigo-100 input input-bordered w-full max-w-full"
                        {...register('name', { required: true })}
                        name='name'
                        type="text"
                        placeholder="Type here"
                    />
                </p>

                <p className="py-4">
                    Details:
                    <textarea
                        {...register('details', { required: true })}
                        name='details'
                        type="text"
                        placeholder="Type here"
                        className="textarea textarea-bordered w-full max-w-full bg-indigo-100"
                    />
                </p>

                <p className="py-4">
                    Rating:
                    <input max={5}
                        {...register('rating', { required: true,})}
                        name='rating'
                        type="number"
                        maxLength="1"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-full bg-indigo-100"
                    />
                </p>

                <p className="py-4">
                    Image:
                    <input
                        {...register('image')}
                        className="appearance-none block bg-indigo-100 w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </p>

                <div className="divider"></div>

                <div className="flex justify-end">
                    <button className='btn w-auto'>Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;
// END: be15d9bcejpp

//     return (
//         <div>
//             <div className="">
//                 <h2>Add Reviews</h2>
//             </div>

//             <div className="divider"></div>

//             <form onSubmit={handleSubmit(addReview)} className="">
//                 <p className="py-4 ">
//                     Name: <input
//                         className="bg-indigo-100 input input-bordered w-full max-w-full"
//                         {...register('name', { required: true })}
//                         name='name'
//                         type="text"
//                         placeholder="Type here"
//                     />
//                 </p>

//                 <p className="py-4">
//                     Details:
//                     <textarea
//                         {...register('details', { required: true })}
//                         name='details'
//                         type="text"
//                         placeholder="Type here"
//                         className="textarea textarea-bordered w-full max-w-full bg-indigo-100"
//                     />
//                 </p>

//                 <p className="py-4">
//                     Rating:
//                     <input
//                         {...register('rating', { required: true })}
//                         name='rating'
//                         type="number"
//                         maxLength="1"
//                         placeholder="Type here"
//                         className="input input-bordered w-full max-w-full bg-indigo-100"
//                     />
//                 </p>

//                 <p className="py-4">
//                     Image:
//                     <input
//                         {...register('image')}
//                         className="appearance-none block bg-indigo-100 w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo"
//                         type="file"
//                     />
//                 </p>

//                 <div className="divider"></div>

//                 <div className="flex justify-end">
//                     <button className='btn w-auto'>Add</button>
//                 </div>
//             </form>
//         </div>
//     );
// };


// export default AddReview;