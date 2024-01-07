import { Module } from '@nestjs/common';
import { Part1Service } from './part1.service';
import { Part1Controller } from './part1.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part1 } from './models/part1.model';

@Module({
  imports: [SequelizeModule.forFeature([Part1])],
  controllers: [Part1Controller],
  providers: [Part1Service],
  exports: [Part1Service],
})
export class Part1Module {}
