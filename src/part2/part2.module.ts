import { Module, forwardRef } from '@nestjs/common';
import { Part2Service } from './part2.service';
import { Part2Controller } from './part2.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part2 } from './models/part2.model';
import { Part3Module } from '../part3/part3.module';

@Module({
  imports: [SequelizeModule.forFeature([Part2]), forwardRef(() => Part3Module)],
  controllers: [Part2Controller],
  providers: [Part2Service],
  exports: [Part2Service],
})
export class Part2Module {}
