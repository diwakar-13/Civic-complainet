import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageAdmins = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // 🔵 ADDED — Search State
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/role/get/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change this user's role to ${newRole}?`,
    );

    if (!confirmChange) return;

    try {
      setUpdatingId(id);

      await API.put(`/admin/role/promote/${id}`, {
        role: newRole,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      alert("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🔵 ADDED — Filter Logic
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="text-sm md:mt-0 mt-5 text-gray-600">
        Loading administrators...
      </div>
    );
  }

  return (
    <div className="mt-5 md:mt-0">
      <div className="relative   mb-10">
        <h1 className="md:text-2xl text-xl  font-semibold text-gray-900 mb-6">
          Manage Administrators
        </h1>

        {/* 🔵 ADDED — Search Input */}
        <div className="mb-6 absolute top-1 right-2 ">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 🔵 UPDATED — using filteredUsers instead of users */}
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <h2 className="text-lg font-medium text-gray-900">{u.name}</h2>

            <p className="text-sm text-gray-600 mt-1 break-all">{u.email}</p>

            <div className="mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  u.role === "ADMIN"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {u.role}
              </span>
            </div>

            <div className="mt-5">
              {u.role === "USER" && (
                <button
                  disabled={updatingId === u.id}
                  onClick={() => updateRole(u.id, "ADMIN")}
                  className={`w-full px-4 py-2 text-sm rounded-lg transition ${
                    updatingId === u.id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {updatingId === u.id ? "Updating..." : "Promote to Admin"}
                </button>
              )}

              {u.role === "ADMIN" && (
                <button
                  disabled={updatingId === u.id}
                  onClick={() => updateRole(u.id, "USER")}
                  className={`w-full px-4 py-2 text-sm rounded-lg transition ${
                    updatingId === u.id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  {updatingId === u.id ? "Updating..." : "Demote to User"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAdmins;
