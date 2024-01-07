import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { BotUpdate } from './bot.update';
import { StudentService } from '../student/student.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  // controllers: [],
  providers: [BotService, BotUpdate],
  exports: [BotService]
})
export class BotModule { }
