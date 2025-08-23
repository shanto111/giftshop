"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/admin/users", { data: { id } });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert("Failed to delete user");
      console.error(error);
    }
  };

  // Change user role handler
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put("/api/admin/users", { id, role: newRole });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      alert("Failed to update role");
      console.error(error);
    }
  };

  return (
    <div className=" p-6  rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        User Management
      </h2>
      <p className=" mb-6 text-white font-medium">
        Total Users: <span className="font-bold">{users.length}</span>
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="">
              <tr>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Role</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-orange-400 transition">
                  <td className="py-3 px-4 border-b border-gray-200">
                    {user.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 capitalize">
                    {user.role}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 flex justify-center gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                        title="Make Admin"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      title="Delete User"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
