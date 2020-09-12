import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from './auth/auth.module';
import PostsModule from './posts/posts.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/puuuudding',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
})
export default class AppModule {}
