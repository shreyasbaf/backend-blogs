import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserInput.password, salt);
      const createdUser = new this.userModel({
        ...createUserInput,
        password: hash,
      });
      return createdUser.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    try {
      const user = await this.userModel.find();
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateUserInput: UpdateUserInput) {
    // return `This action updates a #${id} user`;
    try {
      return this.userModel.findByIdAndUpdate(id, updateUserInput, {
        new: true,
      });
    } catch (error) {
      return new Error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
