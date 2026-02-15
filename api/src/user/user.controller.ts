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
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/create_user.dto';
import { FindUsersQueryDto } from './entities/find_users.query.dto';
import { PaginatedDto } from './entities/paginated.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(PaginatedDto, User)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Seed random users' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['count'],
      properties: {
        count: { type: 'number', example: 100 },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Users seeded successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Seeded 100 users' },
      },
    },
  })
  @Post('seed')
  async seed(@Body('count') count: number) {
    await this.userService.seed(count);
    return { message: `Seeded ${count} users` };
  }

  @ApiOperation({ summary: 'Get paginated users list' })
  @ApiResponse({
    status: 200,
    description: 'Paginated users list',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @Get()
  async findAll(
    @Query() query: FindUsersQueryDto,
  ): Promise<PaginatedDto<User>> {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', example: '65f1b6f9c9e77a001c123456' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({
    status: 200,
    description: 'All users deleted',
    schema: {
      type: 'object',
      properties: {
        deletedCount: { type: 'number', example: 123 },
      },
    },
  })
  @Delete()
  async clearAll() {
    return this.userService.clearAll();
  }
}
