import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard/stats");

        // backend contract trusted
        setStats({
          total: res.data.data.total,
          pending: res.data.data.pending,
          resolved: res.data.data.resolved,
        });
      } catch (err) {
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-gray-600">
        Loading dashboard statistics...
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl md:mt-0 mt-8 font-bold text-gray-900 mb-6">
        Administrative Overview
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <div className="bg-white border rounded-xl p-6">
          <p className=" text-gray-700">Total Complaints</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>

        {/* Pending */}
        <div className="bg-white border rounded-xl p-6">
          <p className=" text-gray-700">Pending Complaints</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {stats.pending}
          </p>
        </div>

        {/* Resolved */}
        <div className="bg-white border rounded-xl p-6">
          <p className=" text-gray-700">Resolved Complaints</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {stats.resolved}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
