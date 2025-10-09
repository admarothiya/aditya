

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const VITE_BASE_URL=import.meta.env.VITE_BASE_URL

export default function ComplaintForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(""); // ✅ Location state
  const navigate = useNavigate();

  const userid = JSON.parse(localStorage.getItem("user")).id;
  console.log("User ID:", userid); // Debugging line to check userId

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Auto fetch live location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const locString = `${lat}, ${lng}`;
          setLocation(locString);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            if (data?.display_name) {
              setLocation(data.display_name);
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          }
        },
        (err) => {
          console.error("Location error:", err);
          alert("Please allow location access to auto-fill location.");
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.agree.checked) {
      alert("You must agree before submitting!");
      return;
    }
    if (!form.reason.value || !location) {
      alert("Location and Reason are required!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("location", location);
      formData.append("reason", form.reason.value);
      formData.append("agree", form.agree.checked);

      
      const res = await fetch(`${VITE_BASE_URL}/api/complaint/create/${userid}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        form.reset();
        setFile(null);
        setLocation("");
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
    <div
      className="min-h-screen bg-cover bg-orange-200 bg-center flex flex-col items-center py-10 px-4"
      // style={{ backgroundImage: "url('/ad.jpg')" }}  // ✅ Home page जैसा BG
    >
      <div className="w-full max-w-3xl flex justify-between items-center mb-6 bg-white/70 p-4 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold">Report a Complaint</h2>

        {/* ✅ Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Dashboard
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/70 shadow-lg rounded-lg p-6 w-full max-w-3xl space-y-6"
      >
        {/* File Upload */}
        <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleFileChange}
          />
          <span className="text-4xl mb-2">📷</span>
          <p className="text-gray-700 font-medium">
            Upload a picture/video of incident
          </p>
          <p className="text-gray-500 text-sm">(Make sure everything is clear)</p>
          {file && <p className="text-green-600 mt-2">{file.name}</p>}
        </label>

        {/* ✅ Auto-Filled Location */}
        <div>
          <input
            type="text"
            name="location"
            value={location}
            readOnly
            placeholder="Fetching live location..."
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        {/* Reason */}
        <div>
          <p className="font-medium mb-2">Reason:</p>
          <div className="space-y-2">
            {[
              "WATER problem (पानी की समस्या)",
              "Traffic aur Road Problems (यातायात समस्या)",
              "Sanitation Problems (सफाई की कमी)",
              "Related to Panchayat Officer (पंचायत अधिकारी से संबंधित)",
              "Potholes in Roads",
              "Pavement Defects",
              "Others",
            ].map((reason, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="radio" name="reason" value={reason} />
                <span>{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* More Info */}
        <div>
          <label className="block mb-2 font-medium">More Information</label>
          <textarea
            rows="4"
            name="moreInfo"
            placeholder="Provide more information about the incident"
            className="w-full border border-gray-400 rounded-lg px-4 py-2"
          ></textarea>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="agree" id="agree" />
          <label htmlFor="agree" className="text-sm text-gray-700">
            By clicking this checkbox, I understood that reporting fake complaints
            against anyone will lead to legal actions against me. *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );

}
