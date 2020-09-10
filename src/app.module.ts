import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostsModule from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/puuuudding',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    PostsModule,
  ],
})
export default class AppModule {}
