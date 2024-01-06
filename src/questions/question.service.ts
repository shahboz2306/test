import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { QuestionDto } from './dto/question.dto';
import { FindOptions, Op } from 'sequelize';
import { UuidService } from '../generate_url/uuid.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    private readonly uuidService: UuidService,
  ) {}

  async create(questionDto: QuestionDto): Promise<object> {
    try {
      const question = await this.questionRepository.create({
        ...questionDto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
        data: {
          question,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // async getById(id: number): Promise<object> {
  //   try {
  //     const question = await this.questionRepository.findByPk(id, {
  //       include: { all: true },
  //     });
  //     if (!question) {
  //       throw new NotFoundException('Mahsulot topilmadi!');
  //     }
  //     return {
  //       statusCode: HttpStatus.OK,
  //       data: {
  //         question,
  //       },
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async get_parts(part_number: number): Promise<object> {
    try {
      const questions = await this.questionRepository.findAll({
        where: {
          part_number: {
            [Op.eq]: part_number,
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          questions,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get_test(uuid: string): Promise<object> {
    try {
      const id = await this.uuidService.getAll();
      if (id != uuid) {
        throw new NotFoundException('This url is not found!');
      }
      const parts: any[] = [];
      const part1: any = await this.get_parts(1);
      const part2: any = await this.get_parts(2);
      const part3: any = await this.get_parts(3);
      parts.push(part1, part2, part3);
      let l: number;
      let randomNumber: number;
      let tests = [];
      for (let i of parts) {
        if (!i.data?.questions?.length) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Questions not found',
            data: {},
          };
        }
        l = i.data?.questions?.length;
        randomNumber = Math.floor(Math.random() * l);
        tests.push(i.data?.questions[randomNumber]);
      }

      // console.log(tests);

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

  // async update(id: number, updateQuestionDto: UpdateProducDto): Promise<object> {
  //   try {
  //     const question = await this.questionRepository.findByPk(id);
  //     if (!question) {
  //       throw new NotFoundException('Mahsulot topilmaadi!');
  //     }
  //     const {
  //       name,
  //       price,
  //       quantity,
  //       description,
  //       color,
  //       salesman_id,
  //       category_id,
  //     } = updateQuestionDto;
  //     let dto = {};
  //     if (!name) {
  //       dto = Object.assign(dto, { name: question.name });
  //     }
  //     if (!price) {
  //       dto = Object.assign(dto, { price: question.price });
  //     }
  //     if (!quantity) {
  //       dto = Object.assign(dto, { quantity: question.quantity });
  //     }
  //     if (!description) {
  //       dto = Object.assign(dto, { description: question.description });
  //     }
  //     if (!color) {
  //       dto = Object.assign(dto, { color: question.color });
  //     }
  //     if (!salesman_id) {
  //       dto = Object.assign(dto, { salesman_id: question.salesman_id });
  //     }
  //     if (!category_id) {
  //       dto = Object.assign(dto, { category_id: question.category_id });
  //     }
  //     if (salesman_id) {
  //       await this.salesmanService.getById(salesman_id);
  //     }
  //     if (category_id) {
  //       await this.categoryService.getById(category_id);
  //     }
  //     const obj = Object.assign(updateQuestionDto, dto);
  //     const update = await this.questionRepository.update(obj, {
  //       where: { id },
  //       returning: true,
  //     });
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: "Mahsulot ma'lumotlari tahrirlandi",
  //       data: {
  //         question: update[1][0],
  //       },
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // async findByOptions(opts: FindOptions<Question>) {
  //   return await this.questionRepository.findAll(opts);
  // }

  async delete(id: number): Promise<object> {
    try {
      const question = await this.questionRepository.findByPk(id);
      if (!question) {
        throw new NotFoundException('Question not found!');
      }
      question.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
