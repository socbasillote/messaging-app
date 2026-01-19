import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    await dispatch(loginUser(form));
    navigate("/chat");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        name="email"
        className="border p-2 block mt-4"
        placeholder="email"
        onChange={handleChange}
      />

      <input
        name="password"
        onChange={handleChange}
        className="border p-2 block mt-4"
        placeholder="password"
        type="password"
      />

      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-4">
        Login
      </button>

      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
}

export default Login;
