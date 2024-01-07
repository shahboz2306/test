import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Part2 } from './models/part2.model';
import { Part2Dto } from './dto/part2.dto';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class Part2Service {
  constructor(@InjectModel(Part2) private part2Repository: typeof Part2) {}

  async create(part2Dto: Part2Dto): Promise<object> {
    try {
      console.log(part2Dto);
      const part = await this.part2Repository.create({
        ...part2Dto,
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
      const part = await this.part2Repository.findAll();

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
      const parts = await this.part2Repository.findByPk(id);
      if (!parts) {
        throw new NotFoundException('Parts not found!');
      }
      parts.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
