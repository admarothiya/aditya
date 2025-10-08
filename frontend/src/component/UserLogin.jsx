import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/user/login", { email, password });

      console.log("Login Response:", res);  // ✅ Debugging: Check API response

      if ((res.status === 200 && res.data.user) || res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/userdashboard");  // ✅ Correct redirect after login
      } else {
        setError(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login Error:", err.response || err);

      setError(
        err.response?.data?.message ||
          "Server error. Please check API or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-orange-400 via-ornge to-orange-200 p-4 relative">

      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-orange-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-orange-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Admin Login
        </button>
      </div>

      <div className="bg-white p-10  rounded-lg shadow-xl max-w-md w-full space-y-6">
        <h1 className="text-4xl font-bold text-orange-600 text-center">Citizen Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/userdashboard")}  // ✅ Correct registration page route
            className="text-orange-600 hover:underline"
          >
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
