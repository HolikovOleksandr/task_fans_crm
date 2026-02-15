import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/token", {
        headers: { "x-api-key": apiKey.trim() },
        method: "POST",
      });

      if (!res.ok) throw new Error("Invalid key");
      const data = await res.json();

      localStorage.setItem("token", data.access_token);
      navigate("/users");
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  return (
    <div>
      <h2>Auth</h2>

      <input
        placeholder="API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <button onClick={login}>Enter</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
