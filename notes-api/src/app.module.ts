import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksModule } from './links/links.module';

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0NotesNest`;

@Module({
  imports: [MongooseModule.forRoot(uri), ConfigModule.forRoot(), LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
