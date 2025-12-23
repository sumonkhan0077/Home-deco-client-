import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";


const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [type, setType] = useState("");
  const [paymentHistory, setPaymentHistory] = useState(0);


  const { data: services = [], isLoading} = useQuery({
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

  if(isLoading) {
    return <Loading></Loading>
  }

 
  return (
    <div>
      <div className="flex justify-between mx-6 my-6 ">
        <h2 className="text-3xl text-primary">
          {" "}
          Payment History <span className="font-bold">
            ({paymentHistory})
          </span>{" "}
        </h2>
        {/* type sort */}
        <div>
          <select className="select " onChange={(e) => setType(e.target.value)}>
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
                <th>Payment Date</th>
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
                   
                    <Link className="hover:text-primary" to={`/services/${service.servicesId}`}>{service.service_name}</Link>
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
