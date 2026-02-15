import { Routes, Route, Link } from "react-router-dom";
import Auth from "./pages/Auth";
import UsersPage from "./pages/Users";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Auth</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  );
}
