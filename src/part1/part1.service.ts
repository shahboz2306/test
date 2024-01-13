import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Part1 } from './models/part1.model';
import { Part1Dto } from './dto/part1.dto';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class Part1Service {
  constructor(
    @InjectModel(Part1) private part1Repository: typeof Part1,
  ) {}

  async create(part1Dto: Part1Dto): Promise<object> {
    try {
      console.log(part1Dto);
      const part = await this.part1Repository.create({
        ...part1Dto,
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
      const part = await this.part1Repository.findAll();

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

  async getById(id: number): Promise<object> {
    try {
      console.log(id, '--');
      const part1 = await this.part1Repository.findByPk(id);
      if (!part1) {
        throw new NotFoundException('Part1 not found!');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          part1,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const part1 = await this.part1Repository.findByPk(id);
      if (!part1) {
        throw new NotFoundException('Part1 not found!');
      }
      part1.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
