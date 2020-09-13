import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export default class PostsService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async getAll(): Promise<Post[]> {
    return this.PostModel.find().exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.PostModel(post);
    return newPost.save();
  }
}
