import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='text-center mt-20'>
            <h2>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my_booking">
            <button className='btn btn-primary text-black'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;