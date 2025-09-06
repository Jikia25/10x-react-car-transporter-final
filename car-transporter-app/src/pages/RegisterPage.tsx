import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// --- Validators ---
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidFullName(name: string) {
  return name.trim().length >= 2 && /^[a-zA-Zაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ\s]+$/.test(name);
}

function isValidPassword(password: string) {
  return password.length >= 6;
}

// --- Fake registration service ---
interface FakeRegisterResponse {
  ok: boolean;
  token?: string;
  error?: string;
}

function fakeRegister(fullName: string, email: string, password: string, delay = 1800): Promise<FakeRegisterResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // რამდენიმე fake error scenario
      if (email === "existing@test.com") {
        resolve({ ok: false, error: "ეს ელ-ფოსტა უკვე რეგისტრირებულია" });
        return;
      }
      if (email.includes("spam")) {
        resolve({ ok: false, error: "არავალიდური ელ-ფოსტის მისამართი" });
        return;
      }
      if (fullName.toLowerCase().includes("test")) {
        resolve({ ok: false, error: "სახელი არ შეიძლება შეიცავდეს 'test'-ს" });
        return;
      }
      
      // წარმატებული registration
      resolve({ ok: true, token: "fake_register_token_456" });
    }, delay);
  });
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  // Validation checks
  const fullNameOk = formData.fullName.length === 0 || isValidFullName(formData.fullName);
  const emailOk = formData.email.length === 0 || isValidEmail(formData.email);
  const passwordOk = formData.password.length === 0 || isValidPassword(formData.password);
  const confirmPasswordOk = formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;

  const formValid = 
    isValidFullName(formData.fullName) &&
    isValidEmail(formData.email) &&
    isValidPassword(formData.password) &&
    formData.password === formData.confirmPassword;

  function handleInputChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fakeRegister(formData.fullName, formData.email, formData.password);
      if (res.ok && res.token) {
        localStorage.setItem("fake_token", res.token);
        setSuccess("ანგარიში წარმატებით შეიქმნა!");
        setTimeout(() => navigate("/"), 1000); // MainPage-ზე redirect
      } else {
        setError(res.error || "რეგისტრაციისას მოხდა შეცდომა");
      }
    } catch (err) {
      setError("კავშირის პრობლემა. გთხოვთ კვლავ სცადოთ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
            🚛 Transport App
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          ახალი ანგარიშის შექმნა
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ან{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            შესვლა არსებულ ანგარიშში
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                სახელი და გვარი
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !fullNameOk ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="მაგ: ნინო გელაშვილი"
                />
              </div>
              {!fullNameOk && formData.fullName.length > 0 && (
                <p className="mt-2 text-sm text-red-600">სახელი უნდა შეიცავდეს მინიმუმ 2 ასოს</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                ელ-ფოსტის მისამართი
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !emailOk ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="თქვენი ელ-ფოსტა"
                />
              </div>
              {!emailOk && formData.email.length > 0 && (
                <p className="mt-2 text-sm text-red-600">გთხოვთ შეიყვანოთ სწორი ელ-ფოსტის მისამართი</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                პაროლი
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !passwordOk ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="მინიმუმ 6 სიმბოლო"
                />
              </div>
              {!passwordOk && formData.password.length > 0 && (
                <p className="mt-2 text-sm text-red-600">პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                პაროლის დადასტურება
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    !confirmPasswordOk ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="გაიმეორეთ პაროლი"
                />
              </div>
              {!confirmPasswordOk && formData.confirmPassword.length > 0 && (
                <p className="mt-2 text-sm text-red-600">პაროლები არ ემთხვევა</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!formValid || submitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  !formValid || submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    რეგისტრაცია...
                  </div>
                ) : (
                  'ანგარიშის შექმნა'
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">ტესტირებისთვის:</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>✅ ნებისმიერი სახელი + ვალიდური ელ-ფოსტა (წარმატება)</p>
              <p>❌ existing@test.com (უკვე რეგისტრირებული)</p>
              <p>❌ ელ-ფოსტაში "spam" (არავალიდური)</p>
              <p>❌ სახელში "test" (აკრძალული)</p>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              რეგისტრაციით თქვენ ეთანხმებით{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                მომსახურების წესებს
              </Link>
              {' '}და{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                კონფიდენციალურობის პოლიტიკას
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}