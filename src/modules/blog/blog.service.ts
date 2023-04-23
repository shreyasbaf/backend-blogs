import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { MessageResponse } from './dto/message-response.type';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>,
    private readonly userService: UserService, // inject UserService here
  ) {}

  create(createBlogInput: CreateBlogInput) {
    try {
      const blog = new this.blogModel(createBlogInput);
      return blog.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    try {
      const blog = await this.blogModel.find();
      if (!blog) {
        return 'Blog not found';
      }
      return { count: 2, blog };
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.blogModel.findOne({ _id: id }).exec();
      if (!blog) {
        return 'Blog not found';
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }

  update(id: string, updateBlogInput: UpdateBlogInput) {
    try {
      return this.blogModel.findByIdAndUpdate(id, updateBlogInput, {
        new: true,
      });
    } catch (error) {
      return new Error(error.message);
    }
  }

  // Promise<MessageResponse>
  async remove(id: string) {
    try {
      const blog = await this.blogModel.findByIdAndDelete(id);
      if (!blog) {
        return {
          message: `Blog Not Found`,
          statusCode: 404,
        };
      }
      return {
        message: `This action removes a #${id} blog`,
        statusCode: 200,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }

  /**
   * Adds a comment to a blog post.
   * @param id - The ID of the blog post to add the comment to.
   * @param comment - The text of the comment to add.
   * @param userId - The ID of the user making the comment.
   * @returns A Promise that resolves to a Blog object if the comment was added successfully,
   * or a MessageResponse object with a status code and error message if an error occurred.
   */

  // async addComment(id: string, comment: string, userId: string): Promise<Blog> {
  async addComment(
    id: string,
    comment: string,
    userId: string,
  ): Promise<Blog | MessageResponse> {
    // Find the user making the comment
    const user: any = await this.userService.findOne(userId);

    // If the user isn't found, return a 404 error message
    if (!user) {
      return {
        message: `User Not Found`,
        statusCode: 404,
      };
    }

    // Add the comment to the blog post's comments array in the database
    const blog = await this.blogModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              message: comment,
              count: comment.length,
              userName: user.firstName,
            },
          },
        },
        { new: true },
      )
      .exec();

    // Return the updated blog post
    return blog;
  }

  /**
   * Add a like to a blog post.
   *
   * @async
   * @param {string} id - The ID of the blog post to like.
   * @param {string} userId - The ID of the user who is liking the blog post.
   * @returns {Promise<MessageResponse | Error>} A Promise that resolves with a MessageResponse object if the like is added successfully, or an Error object if an error occurs.
   * @throws {Error} If an error occurs while processing the request.
   */
  async like(id: string, userId: string): Promise<MessageResponse | Error> {
    try {
      // Find the user who is liking the blog post
      const user: any = await this.userService.findOne(userId);

      // If the user is not found, return a 404 error
      if (!user?._id) {
        return {
          message: `User Not Found`,
          statusCode: 404,
        };
      }

      // Find the blog post to like
      const blog = await this.blogModel.findOne({ _id: id }).exec();

      // If the blog post is not found, return a 404 error
      if (!blog) {
        return {
          message: `Blog Not Found`,
          statusCode: 404,
        };
      }

      // If the user has already liked the blog post, return a 404 error
      if (blog.likes.includes(userId)) {
        return {
          message: `Already Liked`,
          statusCode: 404,
        };
      }

      // Add the user's like to the blog post and save the changes
      blog.likes.push(userId);
      blog.save();

      // Return a success message
      return {
        message: `Liked the blog`,
        statusCode: 200,
      };
    } catch (error) {
      // If an error occurs during processing, throw an error
      return new Error(error.message);
    }
  }

  /**
   * This method unlikes a blog post for a given user.
   *
   * @param id The ID of the blog post to unlike.
   * @param userId The ID of the user who is unliking the blog post.
   * @returns A Promise that resolves to a MessageResponse object or an Error object.
   */
  async unlike(id: string, userId: string): Promise<MessageResponse | Error> {
    try {
      // Find the user based on the provided userId.
      const user: any = await this.userService.findOne(userId);
      // If the user is not found, return a 404 error.
      if (!user?._id) {
        return {
          message: `User Not Found`,
          statusCode: 404,
        };
      }

      // Find the blog based on the provided id.
      const blog = await this.blogModel.findOne({ _id: id }).exec();

      // If the blog is not found, return a 404 error.
      if (!blog) {
        return {
          message: `Blog Not Found`,
          statusCode: 404,
        };
      }

      // Check if the user has already liked the blog post.
      const userIndex = blog.likes.indexOf(userId);
      if (userIndex === -1) {
        // If the user has not liked the blog post, return a 404 error.
        return {
          message: `You have not liked this blog.`,
          statusCode: 404,
        };
      }

      // Remove the user's like from the blog post and save the updated blog object.
      blog.likes.splice(userIndex, 1);
      blog.save();

      // Return a success message with a 200 status code.
      return {
        message: `Unliked this blog`,
        statusCode: 200,
      };
    } catch (error) {
      // If an error occurs, catch it and return a new Error object with the error message.
      return new Error(error.message);
    }
  }
}
