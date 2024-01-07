import { useEffect, useRef } from "react";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import user_img from '../../assets/user.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// Import Rating styles
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const Review = () => {
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/reviews')
            .then(res => {
                setReviews(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
        , [axiosPublic]);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    // const onAutoplayTimeLeft = (s, time, progress) => {
    //     progressCircle.current.style.setProperty('--progress', 1 - progress);
    //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    // };


    return (
        <>
            <section className="my-20 min-w-[80vh] max-w-7xl mx-auto mb-8">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">
                    {reviews.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col justify-center items-center mx-24 my-16 gap-3">
                                <div className="">
                                    <img className='w-[80px] h-[80px] rounded-full' src={review.image ? review.image : user_img} alt="" />
                                </div>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name ? review.name : 'User'}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>

    );
};

export default Review;