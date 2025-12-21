import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [type, setType] = useState("");
  const [paymentHistory, setPaymentHistory] = useState(0);


  const { data: services = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["payment-success", user?.email, type],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user.email}&sort=${type}`
      );
      setPaymentHistory(res.data.paymentHistory);
      return res.data.result;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to back this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
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
          {" "}
          My Bookings Items <span className="font-bold">
            ({paymentHistory})
          </span>{" "}
        </h2>
        {/* type sort */}
        <div>
          <select className="select" onChange={(e) => setType(e.target.value)}>
            <option value="desc">New → Old</option>
            <option value="asc">Old → New</option>
          </select>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto p-4">
          <table className="table bg-primary  ">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Amount ($)</th>
                <th>Booking Date</th>
                <th>Transaction ID</th>
                <th>tracking ID</th>
               
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {services.map((service, i) => (
                <tr key={service._id} className="bg-secondary text-white">
                  <th>{i + 1}</th>
                  <td className="font-normal flex flex-col lg:flex-row gap-2">
                   
                    {service.service_name}
                  </td>
                  <td>{service.amount}</td>
                  <td>{new Date(service.paidAt).toLocaleDateString()}</td>
                  <td>
                    {service.transactionId}
                  </td>
                  <td > 
                    {service.trackingId}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
