import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const EarningsSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: services = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?email=${user?.email}&serviceWorkStatus=complete`
      );
      return res.data;
    },
  });
  return (
    <div className="p-6">
      <h2 className="text-3xl text-primary py-4">
        {" "}
        Earnings Summary <span className="font-bold">({services.length})</span>{" "}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table bg-primary ">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Service Name</th>
                <th>Service Price</th>
                <th>Payout Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {services.map((service, i) => (
                <tr key={service._id} className="bg-secondary text-white">
                  <th>{i + 1}</th>
                  <td className="font-bold flex flex-col lg:flex-row gap-2">
                    {service.service_name}
                  </td>
                  <td>${service.cost}</td>
                  <td>${service.cost * 0.7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
