import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Fake validator ---
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Fake login service ---
interface FakeLoginResponse {
  ok: boolean;
  token: string;
}

function fakeLogin(email: string, password: string, delay = 1000): Promise<FakeLoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, token: "fake_jwt_token_123" });
    }, delay);
  });
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const emailOk = isValidEmail(email);
  const passwordOk = password.trim().length > 0;
  const formValid = emailOk && passwordOk;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fakeLogin(email, password);
      if (res.ok) {
        localStorage.setItem("fake_token", res.token);
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 700);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
            {!emailOk && email.length > 0 && (
              <p className="text-red-600 mt-1 text-sm">Enter a valid email</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password"
             className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
            {!passwordOk && password.length > 0 && (
              <p className="text-red-600 mt-1 text-sm">Password cannot be empty</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formValid || submitting}
            className={`flex w-full justify-center rounded-md px-3 py-2 text-white ${
              !formValid || submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {submitting ? "Please wait..." : "Sign in"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-2 rounded-md bg-green-50 text-green-800 text-center">
            {message}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
