// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🚛</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Route Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Looks like this transport route doesn't exist. 
          Let's get you back to the right destination!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Homepage
          </Link>
          <Link 
            to="/services" 
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;