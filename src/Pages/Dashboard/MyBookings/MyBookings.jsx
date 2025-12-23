import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const MyBookings = () => {
  const { user } = useAuth();
  const [type, setType] = useState("");
  const [totalBooking, setTotalBooking] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { data: services = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-bookings", user?.email, type],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/my-bookings?email=${user.email}&sort=${type}`
      );
      setTotalBooking(res.data.totalBooking);
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
  const handlePayment = async (id) => {
      const serviceRes = await axiosSecure.get(`/booking/${id}`)
      const service = serviceRes.data
      const packageInfo =
      {
          email: user?.email,
          service_name: service.service_name,
          servicesId: service.servicesId.toString(),
          bookingId: service._id.toString(),
          cost: service.cost,
          trackingId: service.trackingId,
          event_date:service.event_date,
          image: service.image,
      }
      
      const res = await axiosSecure.post('/payment-checkout-session', packageInfo)
      console.log(res.data)
      window.location.assign(res.data)
  }
  return (
    <div>
      <div className="flex justify-between mx-6 my-6">
        <h2 className="text-3xl text-primary">
          {" "}
          My Bookings Items <span className="font-bold">
            ({totalBooking})
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
                <th>Amount</th>
                <th>Booking Date</th>
                <th>Transaction ID</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {services.map((service, i) => (
                <tr key={service._id} className="bg-secondary text-white ">
                  <th>{i + 1}</th>
                  <td className="font-normal flex flex-col lg:flex-row gap-2">
                    <img
                      className="w-10 h-10 rounded-sm"
                      src={service.image}
                      alt="package image"
                    />
                    <Link className="hover:text-primary" to={`/services/${service.servicesId}`}>{service.service_name}</Link>
                    
                  </td>
                  <td>{service.cost}</td>
                  <td>{new Date(service.event_date).toLocaleDateString()}</td>
                  <td>
                    {service?.paymentStatus === "paid" && service.transactionId}
                  </td>
                  <td
                    className={`${
                      service?.paymentStatus === "paid" && "text-primary"
                    }`}
                  >
                    {service?.paymentStatus === "paid" ? (
                      <span className="font-bold text-lg">Paid</span>
                    ) : (
                      <button onClick={() => handlePayment(service._id)} className="main-btn2 bg-primary cursor-pointer text-md">
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="space-x-3 ">
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn hover:bg-red-500 "
                    >
                      <FaTrashAlt />
                    </button>
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

export default MyBookings;
