import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { StudentService } from './student.service';
import { StudentDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Send the student answer' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
        },
        part1: {
          type: 'string',
        },
        part2: {
          type: 'string',
        },
        full_name: {
          type: 'string',
        },
      },
    },
  })
  @Post('send_answer')
  @UseInterceptors(FileInterceptor('audio'))
  async create(
    @Body() studentDto: StudentDto,
    @UploadedFile(new ImageValidationPipe()) audio: Express.Multer.File,
  ) {
    return this.studentService.uploadAnswer(studentDto, audio);
  }

  @ApiOperation({ summary: 'Get all students answer' })
  @Get('pagination/:page/:limit')
  getAll(@Param('page') page: number, @Param('limit') limit: number) {
    return this.studentService.getAll(page, limit);
  }

  @ApiOperation({ summary: 'Get all tests by random' })
  @Get('/:uuid')
  get_test(@Param('uuid') uuid: string) {
    return this.studentService.get_test(uuid);
  }

  @ApiOperation({ summary: 'Delete student by ID' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
