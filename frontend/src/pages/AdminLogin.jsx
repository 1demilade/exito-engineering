import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../utils/auth";
import { Lock, Mail, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // OAuth2PasswordRequestForm expects urlencoded form data, not multipart
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      const response = await axios.post(`${API_URL.replace('/api', '')}/api/auth/login`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setToken(response.data.access_token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.detail || err.message || "Login failed. Please check your connection and credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-bold text-primary">Admin Login</h2>
            <p className="text-gray-600 mt-2">Access the admin dashboard</p>
            <p className="text-xs text-gray-400 mt-1">v1.1 Debug</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-1" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="admin@exitoengineering.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
/*
### Step 12: Run the Frontend

1. Make sure backend is still running (in one terminal)
2. In the frontend terminal:
```bash
   npm start
```

3. Your browser should open automatically to `http://localhost:3000`
4. Test all pages: Home, About, Services, Projects, Careers, Contact
5. Test admin login at `http://localhost:3000/admin/login`:
   - Email: `admin@exitoengineering.*/
