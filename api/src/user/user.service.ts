import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/create_user.dto';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async mockMany(count: number) {
    const users: CreateUserDto[] = Array.from({ length: count }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }));

    return this.userModel.insertMany(users);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
