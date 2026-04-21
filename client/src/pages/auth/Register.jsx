import {React, useState } from "react";
import api from "../../services/api"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-xl w-96 border border-slate-800"
      >
        <h2 className="text-xl mb-6 text-indigo-400 font-bold">
          Register
        </h2>

        <input
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 bg-slate-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
}