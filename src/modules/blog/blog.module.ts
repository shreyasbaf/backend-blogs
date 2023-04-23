import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
//import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  providers: [BlogResolver, BlogService],
  exports: [BlogService], // Add BlogService to exports
})
export class BlogModule {}
