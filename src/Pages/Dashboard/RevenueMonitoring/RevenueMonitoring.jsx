import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const RevenueMonitoring = () => {
  const axiosSecure = useAxiosSecure();

  const { data: completedBookings = [], isLoading } = useQuery({
    queryKey: ["completedBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator?serviceWorkStatus=complete`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Total Income Calculation
  const totalIncome = completedBookings.reduce((sum, booking) => {
    return sum + parseFloat(booking.cost || 0);
  }, 0);

  // Group by Service Category
  const categoryData = completedBookings.reduce((acc, booking) => {
    const category = booking.service_category || "Unknown";
    if (!acc[category]) {
      acc[category] = { name: category, count: 0, amount: 0 };
    }
    acc[category].count += 1;
    acc[category].amount += parseFloat(booking.cost || 0);
    return acc;
  }, {});

  const pieData = Object.values(categoryData).map(item => ({
    name: item.name,
    value: item.count,
  }));

  // Group by Service Name (Top 10)
  const serviceNameData = completedBookings.reduce((acc, booking) => {
    const name = booking.service_name || "Unknown Service";
    if (!acc[name]) {
      acc[name] = { name, count: 0, amount: 0 };
    }
    acc[name].count += 1;
    acc[name].amount += parseFloat(booking.cost || 0);
    return acc;
  }, {});

  const barData = Object.values(serviceNameData)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 services

  // Colors for Pie Chart
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        Revenue Monitoring Dashboard
      </h1>

      {/* Total Income Card */}
      <div className="stats shadow w-full max-w-md mx-auto mb-12">
        <div className="stat place-items-center bg-primary text-white">
          <div className="stat-title text-white/80">Total Revenue</div>
          <div className="stat-value text-5xl">${totalIncome.toFixed(2)}</div>
          <div className="stat-desc text-white/70">
            From {completedBookings.length} completed services
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart: Bookings by Category */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Bookings Distribution by Category
          </h2>
          {pieData.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No completed bookings yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart: Top Services by Booking Count */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Top 10 Most Booked Services
          </h2>
          {barData.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `${value} bookings`} />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary Table (Optional - Small View) */}
      <div className="mt-12 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">All Completed Services</h2>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Client</th>
              <th>Date</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {completedBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.service_name}</td>
                <td>{booking.service_category}</td>
                <td>{booking.displayName}</td>
                <td>{new Date(booking.event_date).toLocaleDateString()}</td>
                <td className="font-bold text-success">${booking.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueMonitoring;