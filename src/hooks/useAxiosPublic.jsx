import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://swipe-defend.vercel.app',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

