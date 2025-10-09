import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Please fill all fields!");
      return;
    }

    // Only allow admin login for specific credentials
    if (
      formData.email !== "codewithad@gmail.com" ||
      formData.password !== "123456"
    ) {
      setError("Only admin can login. Invalid credentials.");
      return;
    }

    try {
     axios.post(`${BASE_URL}/api/user/login`, formData);


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/Dashboard");
      setError(""); // Clear error on success
      console.log(formData);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: "url('/src/assets/rrrr.jpg')" }}
    >
      {/* Dark + Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* ✅ Top Navbar */}
      <nav className="w-full flex justify-end items-center p-4 bg-transparent relative z-10 space-x-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          Home
        </button>

        {/* Correct navigation to UserLogin */}
        <button
          onClick={() => navigate("/UserLogin")}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          Citizen Login
        </button>
      </nav>

      {/* ✅ Centered Login Box */}
      <div className="flex flex-1 items-center justify-center relative z-10">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-orange/80 border border-orange-200 p-8 rounded-2xl shadow-2xl w-100"
        >
          <h2 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-600 drop-shadow-md">
            Admin Login
          </h2>
          <p className="text-center text-red-100 mb-6 text-sm">
            Please login with your registered email
          </p>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center mb-4">{error}</div>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Password */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-orange-500 hover:text-orange-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition"
          >
            Login
          </button>

          <p className="text-sm text-red-100 mt-4 text-center hover:text-orange-600 cursor-pointer">
            Forgot Password?
            
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
