import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './dtos/post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async getAll(includeDraft = false): Promise<Post[]> {
    let query;
    if (includeDraft) {
      query = this.PostModel.find();
    } else {
      query = this.PostModel.find({ active: true });
    }
    return query.sort({ createdAt: 'desc' }).lean();
  }

  async getOne(id: string): Promise<PostDto | null> {
    const post: PostDto | null = await this.PostModel.findById(id).lean();
    if (post) {
      post.parsedHtml = 'placeholder';
      return post;
    }
    return null;
  }

  async create(post: PostDto): Promise<Post> {
    const newPost = new this.PostModel(post);
    return newPost.save();
  }

  async update(id: string, post: PostDto): Promise<Post | null> {
    return this.PostModel.findByIdAndUpdate(id, post);
  }
}
