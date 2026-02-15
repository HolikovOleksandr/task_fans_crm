import { CreateUserDto } from './entities/create_user.dto';
import { FindUsersQueryDto } from './entities/find_users.query.dto';
import { PaginatedResponseDto } from './entities/paginated.response.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    this.logger.log(`🆕 Creating user: ${createUserDto.name}`);
    return createdUser.save();
  }

  async seed(count: number) {
    const users: CreateUserDto[] = Array.from({ length: count }, () => ({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      birthDate: faker.date.birthdate(),
    }));

    this.logger.log(`🎲 Mocking ${count} users...`);
    return this.userModel.insertMany(users);
  }

  async findAll(query: FindUsersQueryDto): Promise<PaginatedResponseDto<User>> {
    const {
      page = 1,
      limit = 20,
      name,
      email,
      phone,
    } = query as FindUsersQueryDto;
    const filter: Record<string, unknown> = {};
    const skip = (page - 1) * limit;

    if (name) filter.name = name;
    if (email) filter.email = email;
    if (phone) filter.phone = phone;

    const [data, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).lean().exec(),
      this.userModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    this.logger.log(`📊 Found ${total} users.`);
    return new PaginatedResponseDto(data, total, page, totalPages);
  }

  async findOneById(id: string): Promise<User | null> {
    const user: User | null = await this.userModel.findById(id).exec();

    if (user) this.logger.log(`🔍 Found user with ID: ${id}`);
    else this.logger.warn(`❌ No user found with ID: ${id}`);

    return user;
  }

  async clearAll() {
    this.logger.warn('🧹 Clearing all users from the database!');
    return this.userModel.deleteMany({});
  }
}
