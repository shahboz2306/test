import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Response } from 'express';
import { generateToken, writeToCookie } from 'src/utils/token';
import { Student } from './models/student.model';
import { StudentDto } from './dto/create.dto';
import { UuidService } from '../generate_url/uuid.service';
import { Part1Service } from '../part1/part1.service';
import { Part2Service } from '../part2/part2.service';
import { BotService } from '../bot/bot.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly jwtService: JwtService,
    private readonly uuidService: UuidService,
    private readonly part1Service: Part1Service,
    private readonly part2Service: Part2Service,
    private readonly botService: BotService,
    private readonly fileService: FilesService,
  ) {}

  async uploadAnswer(full_name: string, audio: any) {
    try {
      console.log(audio);

      if (!full_name) {
        throw new NotFoundException('Please enter your full name!');
      }

      if (!audio) {
        throw new NotFoundException('Audio not found!');
      }

      // const file_name:string = await this.fileService.createFile(audio, full_name);
      this.botService.sendAudio(audio, full_name);

      return {
        status: HttpStatus.OK,
        data: 'Your answer was sent successfully!',
      };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, error: error.message };
    }
  }

  async getAll(page: number, limit: number): Promise<object> {
    try {
      const offset = (page - 1) * limit;
      const students = await this.studentRepository.findAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });
      const total_count = await this.studentRepository.count();
      const total_pages = Math.ceil(total_count / limit);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: students,
          pagination: {
            currentPage: Number(page),
            total_pages,
            total_count,
          },
        },
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get_test(uuid: string): Promise<object> {
    try {
      const id = await this.uuidService.getById(uuid);
      if (id != uuid) {
        throw new NotFoundException('This url is not found!');
      }

      const parts: any[] = [];
      const part1: any = await this.part1Service.getAll();
      const part2: any = await this.part2Service.getAll();
      parts.push(part1, part2);
      // console.log(part1, part2);
      let l: number;
      let randomNumber: number;
      let tests = [];
      for (let i of parts) {
        if (!i.data?.part?.length) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Questions not found',
            data: {},
          };
        }
        l = i.data?.part?.length;
        randomNumber = Math.floor(Math.random() * l);
        tests.push(i.data?.part[randomNumber]);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          tests,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<object> {
    try {
      const student = await this.studentRepository.findByPk(id);
      if (!student) {
        throw new NotFoundException('Student not found!');
      }
      student.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
