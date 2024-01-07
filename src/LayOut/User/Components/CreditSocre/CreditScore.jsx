import React, { useEffect, useState } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import useSubscribed from '../../../../hooks/useSubscribed';
import useSingleUser from '../../../../hooks/useSingleUser'; 
import useUserScoreReport from '../../../../hooks/useUserSocreReport';


const CreditScore = () => {
  const [value, setValue] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const checkSubscribed = useSubscribed(user);

  // check if user is subscribed or not is paid or not
  useEffect(() => {
    setPaymentStatus(checkSubscribed);
  }, [checkSubscribed]);

  // get user data
  const { userData, refetch } = useSingleUser(user.email);

  // get user score report using custom hook
  const userReport = useUserScoreReport(user.email);

  // set score value from user report the last one
  useEffect(() => {
    if (userReport) {
      const score = userReport[userReport.length - 1]?.creditScore;
      setValue(score);
    }
  }, [userReport]);

  // if user check score in last 24 hours then he will not be able to check score
  const checkScore = () => {
    if (userReport) {
      const date = new Date();
      const lastDate = new Date(userReport[userReport?.length - 1]?.date);
      const diff = date - lastDate;
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);
      if (days < 15) {
        toast.error('You can check score only once in 15 days');
        return false;
      }
      else {
        return true;
      }
    }
  }

  // handel score
  const handelScore = () => {
    if (checkScore()) {
      const maxValue = 850;
      const minValue = 300;
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      setValue(value);

      const date = new Date().toUTCString();
      const dateOnly = date.split(' ').slice(0, 4).join(' ');

      const data = {
        creditScore: value,
        email: user.email,
        full_name: userData.first_name + ' ' + userData.last_name,
        phone: userData.phone,
        ssn: userData.ssn,
        date: date,
        date_only: dateOnly,
        full_address: {
          address: userData.address,
          city: userData.city,
          state: userData.state,
          zip: userData.zip,
        },
        dob: userData.dob,
      }

      axiosSecure.post('scoreHistory', data)
        .then(res => {
          toast.success('Score Updated Successfully');
          refetch();
        })
        .catch(err => {
          toast.error('Something went wrong');
        })
    }
    else {
      return;
    }
  };


  return (
    <div>
      <h1 className="text-center text-2xl -mt-24 ">Credit Score</h1>

      {/* <div className="flex justify-end">
        <button onClick={createPdf} download className='btn bg-indigo-400 text-white rounded-xl shadow-2xl'>Download</button>
      </div> */}

      <div className="flex items-center justify-center">
        <ReactSpeedometer
          value={value}
          currentValueText="Credit Score : ${value}"
          customSegmentLabels={[
            {
              text: "Very Bad",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Bad",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Ok",
              position: "INSIDE",
              color: "#555",
              fontSize: "19px",
            },
            {
              text: "Good",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Very Good",
              position: "INSIDE",
              color: "#555",
            },
          ]}
        />
      </div>

      <div className="divider -mt-20"></div>

      <div className="flex items-center justify-center ">
        {
          paymentStatus ? <button onClick={handelScore} className="bg-indigo hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Check Score
          </button> : <Link to={'/dashboard/make-payment'} className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Pay
          </Link>
        }
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreditScore;