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
import { Part1Service } from './part1.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Part1Dto } from './dto/part1.dto';

@ApiTags('Part1')
@Controller('part1')
export class Part1Controller {
  constructor(private readonly part1Service: Part1Service) {}

  @ApiOperation({ summary: 'Create a new part1' })
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() part1Dto: Part1Dto) {
    return this.part1Service.create(part1Dto);
  }

  @ApiOperation({ summary: 'Get part1 by part_number' })
  @Get('/getAll')
  getAll() {
    return this.part1Service.getAll();
  }

  // @ApiOperation({ summary: 'Get test by random part types' })
  // @Get('get_test/:uuid')
  // get_test(@Param('uuid') uuid: string) {
  //   return this.part1Service.get_test(uuid);
  // }

  @ApiOperation({ summary: 'Delete part1 by id' })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.part1Service.delete(id);
  } 
}
