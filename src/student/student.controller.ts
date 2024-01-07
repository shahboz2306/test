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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { StudentService } from './student.service';
import { StudentDto } from './dto/create.dto';

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

  

  @ApiOperation({ summary: 'Delete student by ID' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
