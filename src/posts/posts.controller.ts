import {
  Controller,
  Get, Post, Put, Body, Param,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from 'auth/guards/jwt-auth.guard';
import PostsService from './posts.service';
import PostDto from './dtos/post.dto';
import { Post as P } from './schemas/post.schema';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<P[]> {
    return this.postsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: PostDto): Promise<P> {
    return this.postsService.create(post);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() post: PostDto): Promise<P> {
    return this.postsService.update(id, post);
  }
}
