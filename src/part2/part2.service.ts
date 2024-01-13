import { Part3Service } from './../part3/part3.service';
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
import { Part3Dto } from '../part3/dto/part3.dto';

@Injectable()
export class Part2Service {
  constructor(
    @InjectModel(Part2) private part2Repository: typeof Part2,
    private readonly part3Service: Part3Service,
  ) {}

  async create(part2Dto: any): Promise<object> {
    try {
      console.log(part2Dto);
      const part2_dto: Part2Dto = part2Dto.part2;
      const part2 = await this.part2Repository.create({
        ...part2_dto,
      });
      const part3_dto: Part3Dto = { ...part2Dto.part3, part2_id: part2.id };
      const part3 = await this.part3Service.create(part3_dto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
        data: {
          part2,
          part3,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const part2 = await this.part2Repository.findByPk(id, {
        include: { all: true },
      });
      if (!part2) {
        throw new NotFoundException('Part2 not found!');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          part2,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<object> {
    try {
      const part = await this.part2Repository.findAll({
        include: { all: true },
      });

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
      const part2 = await this.part2Repository.findByPk(id);
      if (!part2) {
        throw new NotFoundException('Part2 not found!');
      }
      part2.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
