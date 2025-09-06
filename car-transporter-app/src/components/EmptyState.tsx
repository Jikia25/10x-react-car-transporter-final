// src/components/EmptyState.tsx
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "📦",
  title,
  description,
  actionText,
  actionLink,
  className = ""
}) => {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <Link 
          to={actionLink}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;