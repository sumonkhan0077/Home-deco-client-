import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserCheck, FaUserTimes } from "react-icons/fa";
import AnimatedSection from "../../../Utility/AnimatedSection";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const { data: decorators = [], refetch } = useQuery({
    queryKey: ["decorator", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });
  const handleDeletedDecorator = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/decorator/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "decorator application has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const updateStatus = (decorator, statusValue) => {
    const status = statusValue;
    axiosSecure
      .patch(`/decorator/${decorator._id}`, { status, email: decorator.email })
      .then((res) => {
        console.log(res?.data);
        if (res.data.modifiedCount) {
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <AnimatedSection variants="fadeUp">

        <h2 className="text-3xl px-6 pt-4 pb-4 text-primary">
          {" "}
          Decorators Apply{" "}
          <span className="font-bold">({decorators.length})</span>{" "}
        </h2>
      </AnimatedSection>
        <div>
          <div className="overflow-x-auto p-4">
            <AnimatedSection variants="fadeUp">

            <table className="table bg-primary">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {decorators.map((decorator, i) => (
                  <tr className="bg-secondary text-white " key={decorator._id}>
                    <th>{i + 1}</th>
                    <td className="font-normal flex flex-col lg:flex-row gap-2">
                      <img
                        className="w-10 h-10 rounded-sm"
                        src={decorator.imageUrl}
                        alt=""
                      />
                      {decorator.name}
                    </td>
                    <td>{decorator.email}</td>
                    <td>{decorator.service_type}</td>
                    <td
                      className={
                        decorator.applyStatus === "accepted"
                          ? "text-green-500"
                          : decorator.applyStatus === "rejected"
                          ? "text-red-500"
                          : "text-primary "
                      }
                    >
                      {decorator.applyStatus}
                    </td>
                    <td className="space-x-2 flex justify-center">
                      <button
                        disabled={
                          decorator.applyStatus === "accepted" ? true : false
                        }
                        onClick={() => updateStatus(decorator, "accepted")}
                        className="btn rounded-full font-normal text-white bg-green-600  cursor-pointer"
                      >
                        Accepted
                      </button>
                      {decorator.applyStatus === "accepted" || (
                        <button
                          disabled={
                            decorator.applyStatus === "rejected" ? true : false
                          }
                          onClick={() => updateStatus(decorator, "rejected")}
                          className="btn rounded-full font-normal text-white bg-red-600 cursor-pointer"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => handleDeletedDecorator(decorator._id)}
                        className="btn hover:bg-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDecorators;
