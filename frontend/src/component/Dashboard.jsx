import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`/api/complaint/get-all`);
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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`/api/complaint/update-status/${id}`, { status: newStatus });
      alert(`Complaint marked as ${newStatus}`);
      fetchComplaints();
      setShowDialog(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  console.log(setSelectedComplaint);

  return (
    <div className="flex min-h-screen  bg-gradient-to-br from-orange-200 via-ornge to-orange-100 text-gray-900">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 border-b border-orange-300 pb-4">
          <h1 className="text-3xl font-bold text-orange-600">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/complaintform")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700"
            >
              📝 Report Complaint
            </button>
            <button
              onClick={() => navigate("/CreateEvent")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🎉 Create Event
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-5">
          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-300">
            <h3 className="text-lg font-semibold">Total Complaints</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{complaints.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-300">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {complaints.filter(c => c.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-300">
            <h3 className="text-lg font-semibold">Solved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {complaints.filter(c => c.status === "Solved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-300">
            <h3 className="text-lg font-semibold">Rejected</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {complaints.filter(c => c.status === "Rejected").length}
            </p>
          </div>
        </section>

        <section className="bg-orange p-6 rounded-xl shadow-md border border-orange-300">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Recent Complaints</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, index) => (
                <tr key={index} className="border-b hover:bg-orange-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.mobile}</td>
                  <td className="p-3 text-green-600">{c.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded font-semibold ${
                        c.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : c.status === "Solved"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedComplaint(c);
                        setShowDialog(true);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {showDialog && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-[500px] overflow-y-auto space-y-4">
              {selectedComplaint.file && (
                selectedComplaint.file.endsWith(".mp4") ? (
                  <video controls className="w-full h-64 rounded">
                    <source src={`/${selectedComplaint.file}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={`http://localhost:5000/uploads/${selectedComplaint.file}`}
                    alt="Complaint"
                    className="w-full h-64 object-cover rounded"
                  />
                )
              )}
              <p><strong>Reason:</strong> {selectedComplaint.reason}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleStatusUpdate(selectedComplaint._id, "Rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedComplaint._id, "Solved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Solved
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
