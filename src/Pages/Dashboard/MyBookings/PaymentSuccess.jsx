import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { IoBagCheckSharp } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa';

const PaymentSuccess = () => {

    const [paymentInfo, setPaymentInfo] = useState({})
    const [searchParams] = useSearchParams();
    const sessionId=searchParams.get("session_id")
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
         .then(res=>{

        setPaymentInfo({
            transactionId:res.data.transactionId,
            trackingId:res.data.trackingId
        })
    })
    }, [axiosSecure,sessionId])
    return (
          <div className='flex flex-col justify-center items-center min-h-screen '>
          <FaThumbsUp size={50} className='text-primary' />
  
          <h2 className='text-2xl text-primary font-semibold mb-5'>Payment Success</h2>
          <p className='text-[12px] sm:text-lg'> <span className='font-bold'>Transaction Id:</span> {paymentInfo.transactionId}</p>
          <p className='text-[12px] sm:text-lg' > <span className='font-bold'>Tracking Id:</span> {paymentInfo.trackingId} </p>
        </div>
    );
};

export default PaymentSuccess;