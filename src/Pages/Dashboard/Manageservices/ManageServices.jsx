import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import CreateServices from './CreateServices';
import UpdateServices from './UpdateServices';
import Loading from '../../../Components/Loading/Loading';

const ManageServices = () => {
  const { user, loading } = useAuth();
//   const [type, setType] = useState("desc");
const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading, refetch , } = useQuery({
    enabled: !!user?.email ,
    queryKey: ["services",  search, ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services?search=${search}`);
      return res.data; 
    },
  });
  console.log(services)

 
    if(isLoading) {
    return <Loading></Loading>
  }


  const handleProductAdded = () => {
    refetch();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mx-6 my-6">
        <h2 className="text-3xl text-primary">
          My All Services Items <span className="font-bold">({services.length})</span>
        </h2>
        {/* <div>
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="desc">New → Old</option>
            <option value="asc">Old → New</option>
          </select>
        </div> */}
        <CreateServices  handleProductAdded={handleProductAdded } >
          </CreateServices>
      </div>
      {/* search */}
      <div className='ml-4'>
      <div
        data-aos="flip-up"
        className="flex items-center w-96 bg-gray-50 border border-gray-200 rounded-lg p-1 mb-4"
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          type="search"
          required
          className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
        />
        <button className="bg-primary hover:bg-transparent hover:border hover:border-primary hover:text-primary text-white p-2 rounded-md transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
            />
          </svg>
        </button>
      </div>

      </div>

      <div className="overflow-x-auto p-4">
        <table className="table bg-primary">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Amount($)</th>
              <th>Rating</th>
              
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={service._id} className="bg-secondary text-white">
                <th>{i + 1}</th>
                <td className="font-normal flex flex-col lg:flex-row gap-2">
                  <img className="w-10 h-10 rounded-sm" src={service.image} alt="package" />
                  <Link className='hover:text-primary' to={`/services/${service._id}`}>{service.service_name}</Link>
                  
                </td>
                <td>$ {service.costs?.[0]} - {service.costs?.[2]}</td>
                <td>{service.rating}</td>
            
                <td className="space-x-3 flex justify-center items-center">
                  {/* <button onClick={() => handleDelete(service._id)} className="btn hover:bg-red-500">
                    <FaTrashAlt />
                  </button> */}
                  <button onClick={()=> handleDelete(service._id)} className='btn bg-primary hover:bg-red-600 rounded-full hover:text-white '>
                    Delete
                  </button>
                  <div>
                     <UpdateServices service={service} refetch={refetch}></UpdateServices>
                  </div>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
