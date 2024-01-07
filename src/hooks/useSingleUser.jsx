import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSingleUser = (email) => {
    const axiosSecure = useAxiosSecure();
    const { data: userData = [], refetch } = useQuery({
        queryKey: ['userData', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`singleuser/${email}`);
            return res.data;
        }
    });

    return { userData, refetch };
};

export default useSingleUser;
