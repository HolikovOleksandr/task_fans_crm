import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
};

type Response = {
  data: User[];
  total: number;
  page: number;
  totalPages: number;
};

const apiUrl = "http://localhost:3001/api/v1";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${apiUrl}/get-users?page=${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

      if (!res.ok) return;

      const data: Response = await res.json();
      setUsers(data.data);
      setTotalPages(data.totalPages || 1);
    };

    void load();
  }, [page]);

  return (
    <div>
      <table border={1}>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{new Date(u.birthDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
        Prev
      </button>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
