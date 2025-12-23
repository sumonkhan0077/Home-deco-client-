import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";
import AnimatedSection from "../../../Utility/AnimatedSection";

const TodayTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [allServices , setAllServices] = useState([])

  const {
    data: allBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Filter only planning, working, complete
  const todayTasks = allBookings.filter(b =>
    ["planning", "working", "complete"].includes(b.serviceWorkStatus)
  );

  // Simple status config
  const getStatusInfo = (status) => {
    switch (status) {
      case "assign":
        return { label: "Assigned", color: "badge-warning", next: "planning" };
      case "planning":
        return { label: "Planning", color: "badge-info", next: "working" };
      case "working":
        return { label: "Working", color: "badge-primary", next: "complete" };
      case "complete":
        return { label: "Completed", color: "badge-success", next: null };
      default:
        return { label: "Unknown", color: "badge-ghost", next: null };
    }
  };

  const updateStatus = (booking, nextStatus) => {
    const actionText =
      nextStatus === "planning"
        ? "Start Planning"
        : nextStatus === "working"
        ? "Start Work"
        : nextStatus === "complete"
        ? "Mark as Complete"
        : "";

    Swal.fire({
      title: "Confirm?",
      text: `Do you want to ${actionText.toLowerCase()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: `Yes, ${actionText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/booking/service/${booking._id}`, { status: nextStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: `Status changed to ${getStatusInfo(nextStatus).label}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-4">
      <AnimatedSection variant="fadeLeft">

      <h1 className="text-2xl font-bold text-primary mb-6">
        Today's Assigned Tasks ({todayTasks.length})
      </h1>
      </AnimatedSection>

      {todayTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No tasks assigned for today.</p>
        </div>
      ) : (
        <>
        <AnimatedSection variants="fadeUp">

        <div className="space-y-4">
          {todayTasks.map((booking) => {
            const statusInfo = getStatusInfo(booking.serviceWorkStatus);

            return (
              <div
                key={booking._id}
                className="bg-base-100 border border-gray-200 rounded-lg p-5 shadow-sm"
              >
                {/* Service & Image */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <img
                    src={booking.image}
                    alt={booking.service_name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link className="hover:text-primary text-2xl" to={`/services/${booking.servicesId}`}>{booking.service_name}</Link>
                    <p className="text-gray-700 mt-1">
                      <strong>Client:</strong> {booking.displayName} (
                      {booking.email})
                    </p>
                    <p className="text-gray-700">
                      <strong>Location:</strong> {booking.location}
                    </p>
                    <p className="text-gray-700">
                      <strong>Date:</strong>{" "}
                      {new Date(booking.event_date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-gray-700">
                      <strong>Price:</strong> ${booking.cost} {booking.unit}
                    </p>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Current Status:</span>
                    <div className={`mt-1 `}>{statusInfo.label}</div>
                  </div>

                  {statusInfo.next && (
                    <button
                      onClick={() => updateStatus(booking, statusInfo.next)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      {statusInfo.next === "planning" && "Start Planning"}
                      {statusInfo.next === "working" && "Start Work"}
                      {statusInfo.next === "complete" && "Mark Complete"}
                    </button>
                  )}

                  {booking.serviceWorkStatus === "complete" && (
                    <span className="text-success font-medium text-lg">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedSection>
        
        </>
      )}
    </div>
  );
};

export default TodayTasks;
