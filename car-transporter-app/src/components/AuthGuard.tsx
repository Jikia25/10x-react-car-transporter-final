// src/components/AuthGuard.tsx
import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  fallbackPath?: string;
}

export default function AuthGuard({ children, fallbackPath = '/login' }: AuthGuardProps) {
  const token = localStorage.getItem("fake_token");
  const navigate = useNavigate();

  if (!token) {
    navigate(fallbackPath);
    return null;
  }

  return <>{children}</>;
}