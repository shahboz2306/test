import { Module } from '@nestjs/common';
import { UuidService } from './uuid.service';
import { UuidController } from './uuid.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from './models/uuid.model';

@Module({
  imports: [SequelizeModule.forFeature([Uuid])],
  controllers: [UuidController],
  providers: [UuidService],
  exports: [UuidService],
})
export class UuidModule {}
