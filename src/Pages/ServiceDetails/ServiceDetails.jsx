import React from 'react';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ServiceDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: services = {} } = useQuery({
        queryKey: ['services', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services/${id}`)
            return res.data
        }
    })
    console.log(services)
    return (
        <div>
            <h1 className='text-center font-bold text-4xl'>{services.rating}</h1>
        </div>
    );
};

export default ServiceDetails;