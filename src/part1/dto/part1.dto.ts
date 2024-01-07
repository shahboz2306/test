import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class Part1Dto {
  @ApiProperty({
    example: 'false',
    description: 'Type of isPremium',
  })
  @IsBoolean()
  isPremium: boolean;

  @ApiProperty({
    example: [
      "Speak about you",
      "What is your favorite hobbies?",
      "What is your name?",
    ],
    description: 'Part1 of parts',
  })
  @IsNotEmpty()
  @IsArray()
  part1: Array<string>;

  @ApiProperty({
    example: {
      count: 5,
      count_type: 'Second',
    },
    description: 'Thinking time',
  })
  @IsNotEmpty()
  thinkingTime: object;

  @ApiProperty({
    example: {
      count: 30,
      count_type: 'Second',
    },
    description: 'Speaking time',
  })
  @IsNotEmpty()
  speakingTime: object;
}
