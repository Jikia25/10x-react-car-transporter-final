import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    // შეგიძლია fake registration ჩასვა
    localStorage.setItem("fake_token", "registered_token");
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          type="text"
          placeholder="Full name"
          className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900"
        />
        <input
          type="email"
          placeholder="Email"
          className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
