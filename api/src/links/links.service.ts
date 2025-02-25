import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link } from './schemas/link.schema';
import { CreateLinkDto } from './schemas/create-link.dto';

@Injectable()
export class LinksService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const createdLink = new this.linkModel({
      ...createLinkDto,
      date: new Date(),
    });
    return createdLink.save();
  }

  async findAll(): Promise<Link[]> {
    return this.linkModel.find().exec();
  }

  async findOne(id: string): Promise<Link | null> {
    return this.linkModel.findById(id).exec();
  }

  async update(id: string, updateLinkDto: any): Promise<Link | null> {
    return this.linkModel
      .findByIdAndUpdate(id, updateLinkDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Link | null> {
    return this.linkModel.findByIdAndDelete(id).exec();
  }
}
