import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";
import AnimatedSection from "../../../Utility/AnimatedSection";

const ServicesHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/my-bookings?email=${user.email}&paymentStatus=paid`
      );
      return res.data.result || [];
    },
  });

  // Status Badge Configuration
  const getStatusBadge = (status) => {
    switch (status) {
      case "assign":
        return "badge badge-warning";
      case "planning":
        return "badge badge-info";
      case "working":
        return "badge badge-primary";
      case "complete":
        return "badge badge-success";
      default:
        return "badge badge-ghost";
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-4 md:p-6">
       <title>DecorNest-Dashboard-My Services</title>
      <AnimatedSection variants="fadeUp">

      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        My Booked Services History ({services.length})
      </h1>
      </AnimatedSection>

      {services.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You haven't booked any paid services yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <AnimatedSection variants="fadeUp">

          <table className="table table-zebra w-full   shadow-xl">
            {/* Table Head */}
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>Decorator</th>
                <th>Location</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id } className="bg-secondary text-white transition-colors">
                  <td className="font-medium">{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={service.image}
                            alt={service.service_name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <Link className="hover:text-primary " to={`/services/${service.servicesId}`}>{service.service_name}</Link>
                        <div className="text-sm opacity-70">{service.unit}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="font-bold text-success text-lg">
                      ${service.cost}
                    </span>
                  </td>

                  <td>
                    {new Date(service.event_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td>
                    <span className={`font-medium ${getStatusBadge(service.serviceWorkStatus)}`}>
                      {service.serviceWorkStatus === "assign" && "Assigned"}
                      {service.serviceWorkStatus === "planning" && "Planning"}
                      {service.serviceWorkStatus === "working" && "In Progress"}
                      {service.serviceWorkStatus === "complete" && "Completed"}
                    </span>
                  </td>

                  <td>
                    <div>
                      <div className="font-semibold">{service.decoratorName || "Not Assigned Yet"}</div>
                      {service.decoratorEmail && (
                        <div className="text-sm text-gray-300">{service.decoratorEmail}</div>
                      )}
                    </div>
                  </td>

                  <td>
                    <span className="">{service.location}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </AnimatedSection>
        </div>
      )}
    </div>
  );
};

export default ServicesHistory;