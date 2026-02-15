import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import { RequireAuth } from "./routes/RequireAuth";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
