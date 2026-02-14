import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './entities/create_user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('seed-users')
  async seed(@Body('count') count: number) {
    return this.userService.seed(count);
  }

  @Get('get-users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('get-user/:id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOneById(id);
  }

  @Delete('clear-all-users')
  async clearAll() {
    return this.userService.clearAll();
  }
}
