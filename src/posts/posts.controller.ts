import {
  Controller,
  Get, Post,
  Body,
} from '@nestjs/common';
import PostsService from './posts.service';
import { Post as PostDto } from './schemas/post.schema';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<PostDto[]> {
    return this.postsService.getAll();
  }

  @Post()
  async create(@Body() post: PostDto): Promise<PostDto> {
    return this.postsService.create(post);
  }
}
