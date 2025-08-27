import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("fake_token");
    navigate("/login");
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Welcome to Dashboard 🚗</h1>
      <p className="mt-4 text-gray-600">You are logged in successfully!</p>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
}
