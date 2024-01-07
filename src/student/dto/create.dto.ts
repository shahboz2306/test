import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class StudentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the student',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: 'audio',
    description: 'Audio',
  })
  @IsNotEmpty()
  @IsString()
  audio: string;
}
