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
      const id: any = await this.getAll();
      console.log(id);
      if (id?.length) {
        const uuid = uuidv4();
        const updated_info = await this.uuidRepository.update(
          { id: uuid },
          { where: { id }, returning: true },
        );
        return {
          statusCode: HttpStatus.OK,
          message: 'Generated successfully',
          data: {
            uuid: updated_info[1][0],
          },
        };
      }

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

  async getAll(): Promise<any> {
    try {
      const uuid = await this.uuidRepository.findAll();
      return uuid[0]?.id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get_uuid(): Promise<any> {
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

  async delete(id: number): Promise<object> {
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
