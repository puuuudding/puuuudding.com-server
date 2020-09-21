import {
  Controller,
  Get, Post, Put, Body, Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { PostDto } from './dtos/post.dto';
import { Post as P } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPublicPosts(): Promise<P[]> {
    return this.postsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllPosts(): Promise<P[]> {
    return this.postsService.getAll(true);
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
