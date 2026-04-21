import { useState, useContext } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // 🔥 IMPORTANT: enables session cookie
        },
      );

      // Save user in context
      setUser(res.data.user);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-xl w-96 border border-slate-800"
      >
        <h2 className="text-xl mb-6 text-indigo-400 font-bold">Login</h2>

        <input
          className="w-full mb-3 p-2 bg-slate-800 rounded text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 bg-slate-800 rounded text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
