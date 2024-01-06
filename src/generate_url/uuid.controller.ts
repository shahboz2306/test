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
import { UuidService } from './uuid.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { UuidDto } from './dto/uuid.dto';

@ApiTags('Uuid')
@Controller('uuid')
export class UuidController {
  constructor(private readonly uuidService: UuidService) {}

  @ApiOperation({ summary: 'Create a new uuid' })
  // @UseGuards(AuthGuard)
  @Post()
  create() {
    return this.uuidService.create();
  }

  @ApiOperation({ summary: 'Get generated uuid' })
  // @UseGuards(AuthGuard)
  @Get()
  get_uuid() {
    return this.uuidService.get_uuid();
  }

  // @ApiOperation({ summary: 'Get uuid by ID' })
  // @Get('id/:id')
  // getById(@Param('id') id: number) {
  //   return this.uuidService.getById(id);
  // }

  @ApiOperation({ summary: 'Delete uuid by id' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.uuidService.delete(id);
  } 
}
