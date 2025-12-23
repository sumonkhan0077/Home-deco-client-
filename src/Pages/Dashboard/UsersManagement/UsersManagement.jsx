import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import AnimatedSection from "../../../Utility/AnimatedSection";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

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
          axiosSecure.delete(`/users/${id}`).then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your user has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    };

  return (
    <div className="p-6">
      <AnimatedSection variants="fadeUp">
      <h2 className="text-4xl text-primary">Manage Users: {users.length}</h2>
      <p className="text-xl py-3 ">search text: {searchText}</p>

      </AnimatedSection>

      <AnimatedSection variants="fadeUp">
      {/* search */}
      <div
        data-aos="flip-up"
        className="flex items-center w-96 bg-gray-50 border border-gray-200 rounded-lg p-1 mb-4"
      >
        <input
          onChange={(e) => setSearchText(e.target.value)}
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

      </AnimatedSection>
    
      <div className="overflow-x-auto">
        <AnimatedSection variants="fadeUp">

        <table className="table bg-secondary text-white">
          {/* head */}
          <thead className="text-white bg-primary ">
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-300"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-400"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <th>
                  {" "}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn hover:bg-red-500 "
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </AnimatedSection>
      </div>
    </div>
  );
};

export default UsersManagement;
