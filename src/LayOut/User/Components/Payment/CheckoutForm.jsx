import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();

    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useAuth();

    const totalPrice = 29.95;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Your Payment has failed",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const date = new Date().toUTCString();
                const dateOnly = date.split(' ').slice(0, 4).join(' ');
                const timeOnly = date.split(' ').slice(4, 5).join(' ');

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toUTCString(),
                    date_only: dateOnly,
                    time_only: timeOnly,
                    status: 'success'
                };
                const res = await axiosSecure.post('/payments', payment);
                if (res?.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Payment has been successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/dashboard/userHome');
            }
        }
    };

    return (
        <div className='flex flex-col items-center'>
            {/* <h1 className='text-3xl font-bold mb-4'>Payment Information</h1> */}
            <form onSubmit={handleSubmit} className='w-96'>
                <div className='mb-4'>
                    <label htmlFor='card-element' className='block mb-2 font-medium text-gray-700'>
                        Card Information
                    </label>
                    <CardElement id='card-element' className='p-2 border border-gray-300 rounded' />
                </div>
                <button className='w-full py-2 px-4 bg-primary text-white font-semibold rounded disabled:opacity-50' type='submit' disabled={!stripe}>
                    Pay ${totalPrice}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;