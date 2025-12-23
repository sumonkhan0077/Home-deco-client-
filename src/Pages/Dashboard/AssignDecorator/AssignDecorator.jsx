import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading"
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
const AssignDecorator = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const axiosSecure = useAxiosSecure();
  const decoratorModalRef = useRef();
  const { user, loading } = useAuth();

  const { data: bookings = [], isLoading, refetch: bookingRefetch } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["bookings", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?serviceWorkStatus=pending`);
      return res.data;
    },
  });

  

  // finding the decorator
  const { data: decorators = [], refetch: decoratorRefetch } = useQuery({
    queryKey: ["decorator", selectedBooking?.service_category],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?category=${selectedBooking.service_category}`
      );
      return res.data;
    },
  });

   if(isLoading) {
    return <Loading></Loading>
  }


  const handleFindDecorator = (booking) => {
    setSelectedBooking(booking);
    decoratorModalRef.current.showModal();
  };
  const handleAssignDecorator = (decorator) => {
    const assignDecoratorInfo = {
      decoratorId: decorator._id,
      decoratorName: decorator.name,
      decoratorEmail: decorator.email,
    };
    axiosSecure
      .patch(`/booking/${selectedBooking._id}`, assignDecoratorInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          decoratorModalRef.current.close();
          toast.success("Decorator is assign successfully");
          decoratorRefetch();
          bookingRefetch();
        }
      });
  };
  console.log(bookings);

 

  return (
    <div className="mt-5 p-5">
      {" "}
      <div>
        <h1 className="pb-4 text-3xl text-primary">
          Bookings ({bookings?.length})
        </h1>
        <div>
          <div className="overflow-x-auto">
            {
              isLoading? (<Loading></Loading>): (

            <table className="table table-zebra bg-primary ">
              {/* head */}
              <thead className="">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Amount ($)</th>
                  <th>Pay At</th>
                  <th>Booking Category</th>
                  <th>Event Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, i) => (
                  <tr key={booking._id} className="bg-secondary text-white">
                    <th>{i + 1}</th>
                    <td>{booking.service_name}</td>
                    <td>{booking.cost}</td>
                    <td>{new Date(booking.paidAt).toDateString()}</td>
                    <td>{booking.service_category}</td>
                    <td>{new Date(booking.event_date).toDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleFindDecorator(booking)}
                        className=" main-btn2 "
                      >
                        Assign Decorator
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              )
            }
          </div>
        </div>
        {/* modal*/}
        <dialog
          ref={decoratorModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Decorator Available({decorators?.length})
            </h3>
            {/* riders table  */}
            <div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decorators.map((decorator, i) => (
                      <tr key={decorator._id}>
                        <th>{i + 1}</th>
                        <td>{decorator?.name}</td>
                        <td>{decorator?.email}</td>
                        <td>
                          <button
                            onClick={() => handleAssignDecorator(decorator)}
                            className="main-btn2"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AssignDecorator;
