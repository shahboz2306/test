import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Uuid } from './models/uuid.model';
import { UuidDto } from './dto/uuid.dto';
import { FindOptions, Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidService {
  constructor(@InjectModel(Uuid) private uuidRepository: typeof Uuid) {}

  async create(): Promise<object> {
    try {
      const uuid = await this.uuidRepository.create();

      return {
        statusCode: HttpStatus.OK,
        message: 'Generated successfully',
        data: {
          uuid,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: string): Promise<string> {
    try {
      const uuid = await this.uuidRepository.findByPk(id);
      if (!uuid) {
        throw new NotFoundException('Uuid not found!');
      }
      return uuid.id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<any> {
    try {
      const uuid = await this.uuidRepository.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: '',
        data: {
          uuid,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<object> {
    try {
      const uuid = await this.uuidRepository.findByPk(id);
      if (!uuid) {
        throw new NotFoundException('Uuid not found!');
      }
      uuid.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
