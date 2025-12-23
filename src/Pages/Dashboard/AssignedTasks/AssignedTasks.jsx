import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Status configuration (IMPORTANT)
  const statusConfig = {
    planning: {
      action: "Accept",
      title: "Project Accepted",
      text: "You have accepted this project.",
      icon: "success",
    },
    pending: {
      action: "Reject",
      title: "Project Rejected",
      text: "You have rejected this project.",
      icon: "error",
    },
    working: {
      action: "Start Work",
      title: "Work Started",
      text: "Project is now in working state.",
      icon: "success",
    },
    complete: {
      action: "Complete",
      title: "Work Completed",
      text: "Project has been completed successfully.",
      icon: "success",
    },
  };

  // ✅ Get assigned bookings
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?email=${user?.email}&status=assign`
      );
      return res.data;
    },
  });

  // ✅ Update service work status
  const updateStatus = (booking, statusValue) => {
    const config = statusConfig[statusValue];

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${config.action.toLowerCase()} this project?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: `Yes, ${config.action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/booking/service/${booking._id}`, { status: statusValue })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: config.title,
                text: config.text,
                icon: config.icon,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl mb-4">
        Projects <span className="font-bold">({bookings.length})</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Service Name</th>
              <th>Project Cost</th>
              <th>Payout (70%)</th>
              <th>Location</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.service_name}</td>
                <td>${booking.cost}</td>
                <td>${booking.cost * 0.7}</td>
                <td>{booking.location}</td>
                <td>{new Date(booking.event_date).toDateString()}</td>

                {/* STATUS */}
                <td className="capitalize font-semibold">
                  {booking.serviceWorkStatus}
                </td>

                {/* ACTION BUTTONS */}
                <td className="space-x-2">
                  {booking.serviceWorkStatus === "assign" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking, "planning")}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(booking, "pending")}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.serviceWorkStatus === "planning" && (
                    <button
                      onClick={() => updateStatus(booking, "working")}
                      className="btn btn-warning btn-sm"
                    >
                      Start Work
                    </button>
                  )}

                  {booking.serviceWorkStatus === "working" && (
                    <button
                      onClick={() => updateStatus(booking, "complete")}
                      className="btn btn-primary btn-sm"
                    >
                      Complete
                    </button>
                  )}

                  {booking.serviceWorkStatus === "complete" && (
                    <span className="text-green-600 font-bold">
                      Completed ✅
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedTasks;
