import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useSubscribed = (user) => {
    const [paymentStatus, setPaymentStatus] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/payments/${user.email}`)
            .then(res => {
                const payments = res.data;
                const lastPayment = payments[payments.length - 1];
                if (lastPayment) {
                    const lastPaymentDate = new Date(lastPayment.date);
                    const currentDate = new Date();
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    if (lastPaymentDate >= thirtyDaysAgo && lastPaymentDate <= currentDate) {
                        setPaymentStatus(true);
                    }
                }
            })
    }, [user.email]);

    return paymentStatus;
};

export default useSubscribed;
