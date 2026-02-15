import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './entities/create_user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { FindUsersQueryDto } from './entities/find_users.query.dto';
import { PaginatedResponseDto } from './entities/paginated.response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('seed-users')
  async seed(@Body('count') count: number) {
    await this.userService.seed(count);
    return { message: `Seeded ${count} users` };
  }

  @Get('get-users')
  async findAll(
    @Query() query: FindUsersQueryDto,
  ): Promise<PaginatedResponseDto<User>> {
    return this.userService.findAll(query);
  }

  @Get('get-user/:id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete('clear-all-users')
  async clearAll() {
    return this.userService.clearAll();
  }
}
