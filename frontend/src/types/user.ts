export interface UserDto {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
