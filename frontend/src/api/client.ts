import type { PaginatedResponseDto, UserDto } from "../types/user";

type HttpMethod = "GET" | "POST" | "DELETE";

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

  // ---------- ROUTES ----------
  addUser(payload: Omit<UserDto, "_id" | "createdAt" | "updatedAt">) {
    return this.request<UserDto>("/add-user", "POST", payload);
  }

  seedUsers(count: number) {
    return this.request<void>("/seed-users", "POST", { count });
  }

  getUsers(page = 1) {
    return this.request<PaginatedResponseDto<UserDto>>(
      `/get-users?page=${page}`,
      "GET",
    );
  }

  getUser(id: string) {
    return this.request<UserDto>(`/get-user/${id}`, "GET");
  }

  clearAllUsers() {
    return this.request<void>("/clear-all-users", "DELETE");
  }
}
