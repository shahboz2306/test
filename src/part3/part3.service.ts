import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Part3 } from './models/part3.model';
import { Part3Dto } from './dto/part3.dto';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class Part3Service {
  constructor(
    @InjectModel(Part3) private part3Repository: typeof Part3,
  ) {}

  async create(part3Dto: Part3Dto): Promise<object> {
    try {
      console.log(part3Dto);
      const part = await this.part3Repository.create({
        ...part3Dto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
        data: {
          part,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<object> {
    try {
      const part = await this.part3Repository.findAll();

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          part,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const part3 = await this.part3Repository.findByPk(id);
      if (!part3) {
        throw new NotFoundException('Part3 not found!');
      }
      part3.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
