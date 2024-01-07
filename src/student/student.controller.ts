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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @ApiOperation({ summary: 'Send the student answer' })
  @Post('send_answer')
  register(@Body() studentDto: StudentDto) {
    return this.studentService.create(studentDto);
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

  @ApiOperation({ summary: 'Create new Image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        test_ids: {
          type: 'array',  // Use 'array' for arrays
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body('test_ids') test_ids: string,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    console.log(test_ids);
    return this.studentService.uploadImage(test_ids, image);
  }

  

  @ApiOperation({ summary: 'Delete student by ID' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
