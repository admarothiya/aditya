import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, solved: 0, rejected: 0 });

  
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/complaint/get-all`);
      const formattedComplaints = res.data.map(c => ({
        _id: c._id,
        reason: c.reason,
        status: c.status,
        file: c.filePath,  // Make sure you're using filePath from backend
        name: c.userid?.fullname || "Unknown User",
        email: c.userid?.email || "unknown@example.com",
        mobile: c.userid?.mobile || "N/A"
      }));
      setComplaints(formattedComplaints);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const userid = JSON.parse(localStorage.getItem("user")).id;

  // Fetch complaints for this user
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`/api/complaint/user/${userid}`);
        const data = await res.json();
        if (res.ok) {
          setComplaints(data);
          // calculate stats
          const total = data.length;
          const pending = data.filter(c => c.status === "Pending").length;
          const solved = data.filter(c => c.status === "Solved").length;
          const rejected = data.filter(c => c.status === "Rejected").length;
          setStats({ total, pending, solved, rejected });
        } else {
          alert(data.message || "Failed to fetch complaints");
        }
      } catch (err) {
        console.error(err);
        alert("Server error while fetching complaints");
      }
    };

    fetchComplaints();
  }, [userid]);

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 space-y-8 flex flex-col">
        <h2 className="text-2xl font-bold text-orange-600 text-center">User Portal</h2>

        <nav className="flex flex-col gap-4">
 <button
  onClick={() => navigate("/usercomplaint")}
  className="w-full px-4 py-3 text-left bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  📝 Submit Complaint
</button>


<button
  onClick={() => navigate("/events")}
  className="w-full px-4 py-3 text-left bg-green-600 text-white rounded hover:bg-green-700 transition"
>
  🎉 Events
</button>



          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-3 text-left bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">My Complaints</h1>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow flex flex-col items-center">
            <span className="text-2xl font-bold">{stats.total}</span>
            <span>Total Complaints</span>
          </div>
          <div className="bg-yellow-400 text-white rounded-lg p-6 shadow flex flex-col items-center">
            <span className="text-2xl font-bold">{stats.pending}</span>
            <span>Pending</span>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6 shadow flex flex-col items-center">
            <span className="text-2xl font-bold">{stats.solved}</span>
            <span>Solved</span>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-6 shadow flex flex-col items-center">
            <span className="text-2xl font-bold">{stats.rejected}</span>
            <span>Rejected</span>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Reason</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">File</th> {/* Add File column */}
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No complaints submitted yet
                  </td>
                </tr>
              )}
              {complaints.map((c, idx) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{idx + 1}</td>
                  <td className="px-6 py-3">{c.reason}</td>
                  <td className="px-6 py-3">{c.location}</td>
                  <td className={`px-6 py-3 font-semibold ${c.status === "Solved" ? "text-green-600" : c.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                    {c.status}
                  </td>
                  <td className="px-6 py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                    {c.file ? (
                      c.file.endsWith(".mp4") ? (
                        <video src={`/uploads/${c.file}`} controls className="h-12 w-20 rounded" />
                      ) : (
                        <img src={`/uploads/${c.file}`} alt="complaint" className="h-12 w-20 object-cover rounded" />
                      )
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;



