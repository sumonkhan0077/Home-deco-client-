import React from 'react';
import image5 from "../../assets/error.json";
import Lottie from 'lottie-react';
const ErrorPage = () => {
    return (
        <div>
            <Lottie animationData={image5} loop={true} />
        </div>
    );
};

export default ErrorPage;