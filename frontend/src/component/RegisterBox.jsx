import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterBox = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/user/register`, formData);
      alert("🎉 Registration successful!");  
      navigate("/userlogin");  // ✅ Redirect to User Login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
      <>
    {/* Neon glowing background effects */}
      <div className="absolute -top-12 -right-12 w-70 h-60 bg-yellow-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-600 drop-shadow-lg">
        Create Your Account
      </h2>

      {/* Form */}
      <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-black-200">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="mt-1 w-full px-4 py-2 bg-white/90 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 hover:border-yellow-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
            className="mt-1 w-full px-4 py-2 bg-white/90 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 hover:border-yellow-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black-200">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="9876543210"
            className="mt-1 w-full px-4 py-2 bg-white/90 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 hover:border-yellow-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black-200">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-2 bg-white/90 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 hover:border-yellow-400 transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-md hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] transition duration-200"
        >
          🚀 Register
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-gray-300 relative z-10">
        Already have an account?{" "}
        <span
          className="text-yellow-400 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
      </>
  );
};

export default RegisterBox;
