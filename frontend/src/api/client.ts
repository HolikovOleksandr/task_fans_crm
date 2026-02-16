import type { PaginatedResponseDto, UserDto } from "../types/user";

type HttpMethod = "GET" | "POST" | "DELETE";

export type UsersQuery = {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  phone?: string;
};

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
  ): Promise<T> {
    const token = localStorage.getItem("token");

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`${method} ${path} failed: ${res.status} ${text}`);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  addUser(payload: Omit<UserDto, "_id">) {
    return this.request<UserDto>("/users", "POST", payload);
  }

  seedUsers(count: number) {
    return this.request<{ message: string }>("/users/seed", "POST", { count });
  }

  getUsers(query: UsersQuery = {}) {
    const params = new URLSearchParams();

    params.set("page", String(query.page ?? 1));
    params.set("limit", String(query.limit ?? 20));

    if (query.name?.trim()) params.set("name", query.name.trim());
    if (query.email?.trim()) params.set("email", query.email.trim());
    if (query.phone?.trim()) params.set("phone", query.phone.trim());

    return this.request<PaginatedResponseDto<UserDto>>(
      `/users?${params.toString()}`,
      "GET",
    );
  }

  getUser(id: string) {
    return this.request<UserDto>(`/users/${id}`, "GET");
  }

  clearAllUsers() {
    return this.request<{ deletedCount: number }>("/users", "DELETE");
  }
}
