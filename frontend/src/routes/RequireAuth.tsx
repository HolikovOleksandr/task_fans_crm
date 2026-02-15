import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export function RequireAuth({ children }: Props) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" replace />;

  return <>{children}</>;
}
