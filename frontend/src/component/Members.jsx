import { useEffect, useState } from "react";
import axios from "axios";

function Members() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/user/get-all`);
        setUsers(res.data);
        console.log("Fetched Users:", res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-300 via-ornge to-orange-100 text-gray-900">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">All Members</h1>

      {/* ✅ Status / Summary Box */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-red-400 flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">Total Members</span>
          <span className="text-2xl font-bold text-orange-600">{users.length}</span>
        </div>
      </div>

      <div className="bg-orange p-6 rounded-xl shadow-md border border-orange-300">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-orange-50"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.fullname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 text-green-600">Active</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;
