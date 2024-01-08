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
import { Part2Service } from './part2.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Part2Dto } from './dto/part2.dto';

@ApiTags('Part2')
@Controller('part2')
export class Part2Controller {
  constructor(private readonly part2Service: Part2Service) {}

  @ApiOperation({ summary: 'Create a new part2' })
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() part2Dto: any) {
    return this.part2Service.create(part2Dto);
  }

  @ApiOperation({ summary: 'Get part2 by part_number' })
  @Get('/getAll')
  getAll() {
    return this.part2Service.getAll();
  }
  
  @ApiOperation({ summary: 'Delete part2 by id' })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.part2Service.delete(id);
  } 
}
