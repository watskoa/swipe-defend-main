import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useReportHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: datas = [] } = useQuery({
        queryKey: ['datas', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scoreHistory/${user.email}`);
            return res.data;
        },
    });

    return datas;
};

export default useReportHistory;
