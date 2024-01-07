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
import { Part3Service } from './part3.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Part3Dto } from './dto/part3.dto';

@ApiTags('Part3')
@Controller('part3')
export class Part3Controller {
  constructor(private readonly part3Service: Part3Service) {}

  @ApiOperation({ summary: 'Create a new part3' })
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() part3Dto: Part3Dto) {
    return this.part3Service.create(part3Dto);
  }

  @ApiOperation({ summary: 'Get part3 by part_number' })
  @Get('/getAll')
  getAll() {
    return this.part3Service.getAll();
  }

  // @ApiOperation({ summary: 'Get test by random part types' })
  // @Get('get_test/:uuid')
  // get_test(@Param('uuid') uuid: string) {
  //   return this.part3Service.get_test(uuid);
  // }

  @ApiOperation({ summary: 'Delete part3 by id' })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.part3Service.delete(id);
  } 
}
