import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { QuestionDto } from './dto/question.dto';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Create a new question' })
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() questionDto: QuestionDto) {
    return this.questionService.create(questionDto);
  }

  @ApiOperation({ summary: 'Get question by part_number' })
  @Get('get_parts/:part_number')
  get_parts(@Param('part_number') part_number: number) {
    return this.questionService.get_parts(part_number);
  }

  @ApiOperation({ summary: 'Get test by random part types' })
  @Get('get_test/:uuid')
  get_test(@Param('uuid') uuid: string) {
    return this.questionService.get_test(uuid);
  }

  // @ApiOperation({ summary: 'Get question by ID' })
  // @Get('id/:id')
  // getById(@Param('id') id: number) {
  //   return this.questionService.getById(id);
  // }

  @ApiOperation({ summary: 'Delete question by id' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.questionService.delete(id);
  } 
}
