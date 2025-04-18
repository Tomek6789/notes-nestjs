import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksModule } from './links/links.module';

// MongoDB Atlas - nestjs-links/nest.links
// with data from .env file
// const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0NotesNest`;

// MongoDB Comppas - nestjs-links/nest.links
// const uri = `mongodb://localhost/nest`;

// MongoDB Docker container
const uri = 'mongodb://mongodb:27017/notes';

@Module({
  imports: [MongooseModule.forRoot(uri), ConfigModule.forRoot(), LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
