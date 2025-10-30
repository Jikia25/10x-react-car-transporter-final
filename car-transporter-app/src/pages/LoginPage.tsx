import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { users } from "../data/users";
import { UserProvider, useUser } from "../context/UserContext";

// --- Fake validator ---
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Fake login service ---
interface FakeLoginResponse {
  ok: boolean;
  token?: string;
  error?: string;
}

function fakeLogin(
  email: string,
  password: string,
  delay = 1500
): Promise<FakeLoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // რამდენიმე fake error scenario
      if (email === "test@error.com") {
        resolve({ ok: false, error: "ანგარიში დროებით დაბლოკილია" });
        return;
      }
      if (password === "wrongpass") {
        resolve({ ok: false, error: "არასწორი პაროლი" });
        return;
      }
      if (email === "notfound@test.com") {
        resolve({ ok: false, error: "მომხმარებელი ვერ მოიძებნა" });
        return;
      }

      // წარმატებული login
      resolve({ ok: true, token: "fake_jwt_token_123" });
    }, delay);
  });
}

// --- Password Reset Modal Component (Inline) ---
interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function fakePasswordReset(
  email: string,
  delay = 2000
): Promise<{ ok: boolean; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "notfound@test.com") {
        resolve({
          ok: false,
          error: "ეს ელ-ფოსტა ჩვენს სისტემაში ვერ მოიძებნა",
        });
        return;
      }
      resolve({ ok: true });
    }, delay);
  });
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const emailValid = isValidEmail(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid) return;

    setSubmitting(true);
    setError(null);

    try {
      const result = await fakePasswordReset(email);
      if (result.ok) {
        setSuccess(true);
      } else {
        setError(result.error || "შეცდომა მოხდა");
      }
    } catch (err) {
      setError("კავშირის პრობლემა. გთხოვთ კვლავ სცადოთ.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setEmail("");
    setSubmitting(false);
    setSuccess(false);
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0a2 2 0 01-2 2m0 0a2 2 0 01-2-2m0 0a2 2 0 00-2-2m2 2v10"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  პაროლის აღდგენა
                </h3>

                {!success ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        შეიყვანეთ თქვენი ელ-ფოსტის მისამართი და ჩვენ
                        გამოგიგზავნით პაროლის აღდგენის ინსტრუქციას.
                      </p>

                      <label
                        htmlFor="reset-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        ელ-ფოსტის მისამართი
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          email.length > 0 && !emailValid
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="თქვენი ელ-ფოსტა"
                        disabled={submitting}
                      />
                      {email.length > 0 && !emailValid && (
                        <p className="mt-1 text-sm text-red-600">
                          გთხოვთ შეიყვანოთ სწორი ელ-ფოსტის მისამართი
                        </p>
                      )}
                    </div>

                    {error && (
                      <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={submitting}
                      >
                        გაუქმება
                      </button>
                      <button
                        type="submit"
                        disabled={!emailValid || submitting}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          !emailValid || submitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            გაგზავნა...
                          </div>
                        ) : (
                          "ინსტრუქციის გაგზავნა"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      ინსტრუქცია გაგზავნილია!
                    </h4>
                    <p className="text-sm text-gray-600 mb-6">
                      პაროლის აღდგენის ინსტრუქცია გაგზავნილია{" "}
                      <strong>{email}</strong>-ზე. შეამოწმეთ თქვენი ელ-ფოსტა
                      (მათ შორის spam ფოლდერი).
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      💡 ეს არის demo - რეალურად ელ-ფოსტა არ გაიგზავნება
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      დახურვა
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  // const setTestUser = useContext(UserProvider);
  const { setTestUser } = useUser();
  const navigate = useNavigate();

  const emailOk = email.length === 0 || isValidEmail(email);
  const passwordOk = password.length === 0 || password.trim().length >= 3;
  const formValid = isValidEmail(email) && password.trim().length >= 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const currentUser = users.filter(
      (user: any) => user.username === email && password === user.password
    );
    setTestUser(currentUser[0]);
    navigate("/");

    console.log(currentUser[0]);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800"
          >
            🚛 Transport App
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          შესვლა ანგარიშში
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ან{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ახალი ანგარიშის შექმნა
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ელ-ფოსტის მისამართი
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !emailOk ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="თქვენი ელ-ფოსტა"
                />
              </div>
              {!emailOk && email.length > 0 && (
                <p className="mt-2 text-sm text-red-600">
                  გთხოვთ შეიყვანოთ სწორი ელ-ფოსტის მისამართი
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                პაროლი
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !passwordOk ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="თქვენი პაროლი"
                />
              </div>
              {!passwordOk && password.length > 0 && (
                <p className="mt-2 text-sm text-red-600">
                  პაროლი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  პაროლის დავიწყება?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!formValid || submitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  !formValid || submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    შესვლა...
                  </div>
                ) : (
                  "შესვლა"
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-4 rounded-md bg-green-50 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              ტესტირებისთვის:
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>✅ ნებისმიერი ელ-ფოსტა + ნებისმიერი პაროლი (წარმატება)</p>
              <p>❌ test@error.com (შეცდომა)</p>
              <p>❌ პაროლი: wrongpass (არასწორი პაროლი)</p>
              <p>❌ notfound@test.com (მომხმარებელი ვერ მოიძებნა)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
    </div>
  );
}
