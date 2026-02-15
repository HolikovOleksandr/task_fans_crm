import { CreateUserDto } from './entities/create_user.dto';
import { FindUsersQueryDto } from './entities/find_users.query.dto';
import { PaginatedDto } from './entities/paginated.dto';
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
    const batchSize = 10_000;
    this.logger.log(`🚀 Starting to seed ${count} users`);

    for (let inserted = 0; inserted < count; inserted += batchSize) {
      const size = Math.min(batchSize, count - inserted);

      const batch = Array.from({ length: size }, () => ({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        birthDate: faker.date.birthdate(),
      }));

      await this.userModel.collection.insertMany(batch, { ordered: false });
    }

    this.logger.log(`✅ Finished seeding ${count} users`);
  }

  async findAll(query: FindUsersQueryDto): Promise<PaginatedDto<User>> {
    const { page = 1, limit = 20, name, email, phone } = query;
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
    this.logger.log(
      ` 📄 Returned ${data.length} users (page ${page}/${totalPages}), total=${total}`,
    );

    return { data, total, page, totalPages };
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
