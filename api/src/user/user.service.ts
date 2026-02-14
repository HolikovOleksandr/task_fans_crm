import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/create_user.dto';
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

  async findAll(): Promise<User[]> {
    const allUsers = await this.userModel.find().exec();
    this.logger.log(`📋 Found ${allUsers.length} users`);
    return allUsers;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (user) this.logger.log(`🔍 Found user with ID: ${id}`);
    return user;
  }

  async clearAll() {
    this.logger.warn('🧹 Clearing all users from the database!');
    return this.userModel.deleteMany({});
  }
}
