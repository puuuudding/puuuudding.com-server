import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthModule from './auth/auth.module';
import PostsModule from './posts/posts.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
})
export default class AppModule {}
