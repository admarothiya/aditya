import { useState } from "react";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Aditya Kumawat",
    email: "aditya@gmail.com",
    mobile: "9876543210",
    pic: "/src/assets/ad.jpg",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic" && files.length > 0) {
      setProfile({ ...profile, pic: URL.createObjectURL(files[0]) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-300 via-ornge to-orange-100 text-gray-900">
      {/* Profile Card */}
      <div className="w-[620px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-orange-200">
        
        {/* Header */}
        <div className="h-36 pt-9 bg-gradient-to-r from-orange-500 to-yellow-400 flex items-start justify-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            My Profile
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center -mt-16 px-8 pb-8">
          <img
            src={profile.pic}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2 className="text-3xl font-bold mt-4 text-orange-700">{profile.name}</h2>
          <p className="text-gray-600 text-lg">{profile.email}</p>
          <p className="text-gray-500 text-sm">📱 {profile.mobile}</p>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              ✏️ Edit Profile
            </button>
            <button className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg shadow-md transition duration-300">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white w-[480px] p-6 rounded-2xl shadow-2xl border border-orange-200 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
              Edit Profile
            </h2>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-400"
                placeholder="Enter Name"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-400"
                placeholder="Enter Email"
              />

              {/* Mobile */}
              <input
                type="text"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-400"
                placeholder="Enter Mobile Number"
              />

              {/* Profile Pic */}
              <input
                type="file"
                name="pic"
                accept="image/*"
                onChange={handleChange}
                className="p-2 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}
