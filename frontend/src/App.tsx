import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Users from "./pages/Users";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}
