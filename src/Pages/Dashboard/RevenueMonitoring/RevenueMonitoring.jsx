import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const RevenueMonitoring = () => {

     const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: services = [], } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/decorator?serviceStatus=complete`)
            return res.data
        }
    })
    return (
        <div>
        {services.length}
        </div>
    );
};

export default RevenueMonitoring;