import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    console.log(form);
    await API.post("/auth/register", form);

    navigate("/");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        name="username"
        onChange={handleChange}
        className="border p-2 block mt-4"
        placeholder="username"
      />
      <input
        name="email"
        onChange={handleChange}
        className="border p-2 block mt-4"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        className="border p-2 block mt-4"
        placeholder="password"
      />

      <button onClick={register} className="bg-green-500 text-white p-2 mt-4">
        Create Account
      </button>
    </div>
  );
}

export default Register;
