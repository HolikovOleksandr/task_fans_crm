import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Auth() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/token", {
        headers: { "x-api-key": apiKey.trim() },
        method: "POST",
      });

      if (!res.ok) throw new Error("Invalid key");

      const data: { access_token: string } = await res.json();
      localStorage.setItem("token", data.access_token);

      navigate("/");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                <span style={{ color: "#ffffff" }}>User</span>
                <span style={{ color: "#ffa31a" }}>Hub</span>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Enter your API key
              </Typography>
            </Box>

            <TextField
              label="API key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void login();
              }}
            />

            <Button
              onClick={login}
              disabled={loading || apiKey.trim().length === 0}
              size="large"
            >
              {loading ? "Signing in..." : "Enter"}
            </Button>

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
