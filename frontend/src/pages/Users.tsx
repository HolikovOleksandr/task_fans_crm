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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/get-users?page=${page}&limit=20`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data: Response) => setUsers(data.data));
  }, [page]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Birth</th>
          </tr>
        </thead>
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

      <br />

      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
