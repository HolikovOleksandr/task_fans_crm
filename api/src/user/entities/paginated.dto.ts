import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 5 })
  totalPages: number;

  constructor(data: T[], total: number, page: number, totalPages: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.totalPages = totalPages;
  }
}
