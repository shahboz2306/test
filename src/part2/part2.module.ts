import { Module } from '@nestjs/common';
import { Part2Service } from './part2.service';
import { Part2Controller } from './part2.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part2 } from './models/part2.model';

@Module({
  imports: [SequelizeModule.forFeature([Part2])],
  controllers: [Part2Controller],
  providers: [Part2Service],
  exports: [Part2Service],
})
export class Part2Module {}
