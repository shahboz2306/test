import { Module, forwardRef } from '@nestjs/common';
import { Part3Service } from './part3.service';
import { Part3Controller } from './part3.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part3 } from './models/part3.model';
import { Part2Module } from '../part2/part2.module';

@Module({
  imports: [SequelizeModule.forFeature([Part3]), forwardRef(() => Part2Module)],
  controllers: [Part3Controller],
  providers: [Part3Service],
  exports: [Part3Service],
})
export class Part3Module {}
