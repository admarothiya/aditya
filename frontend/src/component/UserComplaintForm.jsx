import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserComplaintForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const userid = JSON.parse(localStorage.getItem("user")).id;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await res.json();
            if (data.display_name) setLocation(data.display_name);
          } catch (err) {
            console.error("Location error:", err);
          }
        },
        (err) => {
          console.error(err);
          alert("Allow location access to auto-fill location.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("File is required.");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("location", location);
      formData.append("reason", e.target.reason.value);
      formData.append("agree", e.target.agree.checked);

      const res = await fetch(`/api/complaint/create/${userid}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Complaint submitted successfully!");
        e.target.reset();
        setFile(null);
        setLocation("");
        navigate("/userdashboard"); // Navigate to dashboard after submit
      } else {
        alert(data.message || "Error submitting complaint");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900 relative">
      {/* ✅ Top-right buttons */}
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-orange-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/userdashboard")}
          className="bg-white text-orange-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Submit a Complaint
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6"
        >
          <label className="block">
            📁 Upload Image/Video:
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              required
              className="mt-2 w-full"
            />
          </label>

          <label className="block">
            📍 Location:
            <input
              type="text"
              name="location"
              value={location}
              readOnly
              className="w-full mt-2 border rounded p-2 bg-gray-100"
            />
          </label>

          <label className="block">
            ✍️ Reason:
            <textarea
              name="reason"
              rows="4"
              placeholder="Describe your complaint..."
              className="w-full mt-2 border rounded p-2"
              required
            />
          </label>

          <label className="block">
            <input type="checkbox" name="agree" required /> I confirm false
            complaints will be penalized.
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default UserComplaintForm;
