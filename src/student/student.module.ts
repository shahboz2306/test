import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { UuidModule } from '../generate_url/uuid.module';
import { Part1Module } from '../part1/part1.module';
import { Part2Module } from '../part2/part2.module';
import { BotModule } from '../bot/bot.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
    UuidModule,
    Part1Module,
    Part2Module,
    BotModule,
    FilesModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
