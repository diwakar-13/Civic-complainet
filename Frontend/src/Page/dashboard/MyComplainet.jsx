import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complain/get");

        setComplaints(res.data.complaint || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Sort newest first
  const sortedComplaints = complaints
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Filter logic
  const filteredComplaints =
    filter === "ALL"
      ? sortedComplaints
      : sortedComplaints.filter((c) => c.status === filter);

  if (loading)
    return <div className="text-sm text-gray-600">Loading complaints...</div>;

  if (error) return <div className="text-sm text-red-600">{error}</div>;

  return (
    <div className="md:mt-0 mt-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        My Complaints
      </h1>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["ALL", "PENDING", "RESOLVED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-xs font-medium rounded-md border
            ${
              filter === status
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="text-sm text-gray-600">No complaints found.</div>
      ) : (
        <div className="bg-white border rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Image</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {c.title}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">
                    {c.description}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          c.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {c.image_url ? (
                      <a
                        href={c.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;