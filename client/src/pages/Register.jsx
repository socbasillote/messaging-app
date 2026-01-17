function Register() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Register</h2>

      <input className="border p-2 block mt-4" placeholder="username" />
      <input className="border p-2 block mt-4" placeholder="email" />
      <input className="border p-2 block mt-4" placeholder="password" />

      <button className="bg-green-500 text-white p-2 mt-4">
        Create Account
      </button>
    </div>
  );
}

export default Register;
