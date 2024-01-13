import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
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
    example: 'John Doe',
    description: 'Full name of the student',
  })
  @IsNotEmpty()
  @IsString()
  part1: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the student',
  })
  @IsNotEmpty()
  @IsString()
  part2: string;
}
