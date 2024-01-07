import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://e-credit-monitoring-server.vercel.app',
    // baseURL: 'https://swipe-defend-qbzdc17lb-watskoas-projects.vercel.app',
    // baseURL: 'http://localhost:5000',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

