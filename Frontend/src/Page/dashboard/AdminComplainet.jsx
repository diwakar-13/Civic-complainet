import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // ===============================
  // FETCH ALL COMPLAINTS
  // ===============================
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complain/all");

        const data = res.data.complaint || res.data.complaints || [];

        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        

        setComplaints(sorted);
        setFiltered(sorted);
      } catch (err) {
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // ===============================
  // FILTER LOGIC
  // ===============================
  useEffect(() => {
    if (filter === "ALL") {
      setFiltered(complaints);
    } else {
      setFiltered(complaints.filter((c) => c.status === filter));
    }
  }, [filter, complaints]);

  // ===============================
  // UPDATE STATUS
  // ===============================
  const updateStatus = async (id) => {
    try {
      setUpdatingId(id);

      await API.put(`/complain/update/status/${id}`, {
        status: "RESOLVED",
      });

      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "RESOLVED" } : c)),
      );
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return <div className="text-sm text-gray-600">Loading complaints...</div>;

  if (error) return <div className="text-sm text-red-600">{error}</div>;

  return (
    <div className="md:mt-0 mt-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Complaint Management
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

      {filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No complaints found.</div>
      ) : (
        <div className="bg-white border rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => {
                return (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {c.title}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">
                      {c.address || "-"}
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

                    {/* LOCATION */}
                    <td className="px-4 py-3 text-xs">
                      {c.latitude != null && c.longitude != null ? (
                        <a
                          href={`https://www.google.com/maps?q=${Number(
                            c.latitude,
                          )},${Number(c.longitude)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Map
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {c.status === "PENDING" && (
                        <button
                          disabled={updatingId === c.id}
                          onClick={() => updateStatus(c.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 disabled:opacity-50"
                        >
                          {updatingId === c.id
                            ? "Updating..."
                            : "Mark Resolved"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
