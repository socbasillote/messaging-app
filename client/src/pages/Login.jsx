import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const fakeLogin = () => {
    dispatch(
      loginSuccess({
        user: { id: 1, name: "Test User" },
        token: "123",
      }),
    );
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Login</h2>

      <input className="border p-2 block mt-4" placeholder="email" />

      <input
        className="border p-2 block mt-4"
        placeholder="password"
        type="password"
      />

      <button onClick={fakeLogin} className="bg-blue-500 text-white p-2 mt-4">
        Login
      </button>

      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
}

export default Login;
