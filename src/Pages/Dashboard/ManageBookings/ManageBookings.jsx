import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading"
import useAuth from "../../../Hooks/useAuth";



const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: services = [], isLoading } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });
  if(isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="mx-6 my-6">
      <h2 className="text-3xl  pb-6 text-primary">
        {" "}
        Bookings Items <span className="font-bold text-primary">({services.length})</span>{" "}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table bg-primary text-white">
            {/* head */}
            <thead className="text-white">
              <tr>
                <th>No</th>
                <th>Services Name</th>
                <th>User Name</th>
                <th>Amount</th>
                <th>Event Date</th>
                <th>Transaction ID</th>
                <th>Payment</th>
                <th>service Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {services.map((service, i) => (
                <tr key={service._id} className="bg-secondary">
                  <th>{i + 1}</th>
                  <td className="font-normal flex flex-col lg:flex-row gap-2">
                    <Link className="hover:text-primary" to={`/services/${service.servicesId}`}>{service.service_name}</Link>
                  </td>
                  <td>{service.displayName}</td>
                  <td>{service.cost}</td>
                  <td>{new Date(service.event_date).toDateString()}</td>
                  <td>
                    {service?.paymentStatus === "paid" && service.transactionId}
                  </td>
                  <td
                    className={`${
                      service?.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {service?.paymentStatus === "paid" ? (
                      <span className="font-normal text-lg">Paid</span>
                    ) : (
                      <span className="font-normal text-lg">Unpaid</span>
                    )}
                  </td>
                  <td>
                    {service.serviceWorkStatus || "N/A"}
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

export default ManageBookings;
