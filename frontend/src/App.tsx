import { Routes, Route, Link } from "react-router-dom";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Auth</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  );
}
