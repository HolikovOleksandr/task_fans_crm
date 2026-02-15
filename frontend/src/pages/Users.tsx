import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ApiClient } from "../api/client";
import type { UserDto } from "../types/user";

export default function Users() {
  const api = useMemo(() => new ApiClient("http://localhost:3001/api/v1"), []);

  const [users, setUsers] = useState<UserDto[]>([]);
  const [selected, setSelected] = useState<UserDto | null>(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [seedCount, setSeedCount] = useState(1000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadUsers = async (p = 1) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.getUsers(p);
      setUsers(res.data);
      setPage(res.page);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeed = async () => {
    setLoading(true);
    setError("");

    try {
      await api.seedUsers(seedCount);
      await loadUsers(1);
      setSelected(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    setError("");

    try {
      await api.clearAllUsers();
      setUsers([]);
      setTotal(0);
      setPage(1);
      setTotalPages(1);
      setSelected(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const canPrev = !loading && page > 1;
  const canNext = !loading && page < totalPages;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight={700}>
            Users
          </Typography>
          <Typography color="text.secondary">Total: {total}</Typography>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Actions */}
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ sm: "center" }}
            >
              <TextField
                label="Seed count"
                type="number"
                value={seedCount}
                onChange={(e) => setSeedCount(Number(e.target.value))}
                sx={{ width: { xs: "100%", sm: 180 } }}
                inputProps={{ min: 0 }}
              />

              <Button onClick={handleSeed} disabled={loading || seedCount <= 0}>
                {loading ? "Working..." : "Seed"}
              </Button>

              <Button
                color="error"
                variant="outlined"
                onClick={handleClear}
                disabled={loading}
              >
                Clear all
              </Button>

              <Box sx={{ flex: 1 }} />

              <Button
                variant="text"
                onClick={() => loadUsers(page)}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          {/* Table */}
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="h6">List</Typography>
                <Typography color="text.secondary">
                  Page {page} / {totalPages}
                </Typography>
              </Stack>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ color: "text.secondary" }}>
                        {loading ? "Loading..." : "No users"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((u) => (
                      <TableRow
                        key={u._id}
                        hover
                        onClick={() => setSelected(u)}
                        selected={selected?._id === u._id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phone}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
                alignItems="center"
              >
                <Button disabled={!canPrev} onClick={() => loadUsers(page - 1)}>
                  Prev
                </Button>
                <Button disabled={!canNext} onClick={() => loadUsers(page + 1)}>
                  Next
                </Button>
                {loading && (
                  <Typography color="text.secondary" sx={{ ml: "auto" }}>
                    Loading...
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User details
              </Typography>

              {!selected ? (
                <Typography color="text.secondary">Pick a user</Typography>
              ) : (
                <Stack spacing={1}>
                  <Typography>
                    <b>ID:</b> {selected._id}
                  </Typography>
                  <Typography>
                    <b>Name:</b> {selected.name}
                  </Typography>
                  <Typography>
                    <b>Email:</b> {selected.email}
                  </Typography>
                  <Typography>
                    <b>Phone:</b> {selected.phone}
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}
