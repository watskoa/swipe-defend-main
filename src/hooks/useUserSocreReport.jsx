import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';

const useUserScoreReport = (userEmail) => {
    const [userReport, setUserReport] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUserReport = async () => {
            try {
                const response = await axiosSecure.get(`/scoreHistory/${userEmail}`);
                setUserReport(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            }
        };

        fetchUserReport();
    }, [userEmail]);

    return userReport;
};

export default useUserScoreReport;
