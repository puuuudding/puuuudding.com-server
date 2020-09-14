import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import PostDto from './dtos/post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export default class PostsService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async getAll(): Promise<Post[]> {
    return this.PostModel.find().exec();
  }

  async getOne(id: string): Promise<PostDto> {
    const post: PostDto = await this.PostModel.findById(id).lean();
    if (post) {
      post.parsedHtml = 'placeholder';
      return post;
    }
    throw new NotFoundException();
  }

  async create(post: PostDto): Promise<Post> {
    const newPost = new this.PostModel(post);
    return newPost.save();
  }

  async update(id: string, post: PostDto): Promise<Post> {
    return this.PostModel.findByIdAndUpdate(id, post);
  }
}
