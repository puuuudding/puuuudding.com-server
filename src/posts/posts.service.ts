import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export default class PostsService {
  constructor(@InjectModel(Post.name) private PostModal: Model<Post>) {}

  async getAll(): Promise<Post[]> {
    return this.PostModal.find().exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.PostModal(post);
    return newPost.save();
  }
}
