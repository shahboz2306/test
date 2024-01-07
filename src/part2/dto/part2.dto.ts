import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class Part2Dto {
  @ApiProperty({
    example: 'false',
    description: 'Type of isPremium',
  })
  @IsBoolean()
  isPremium: boolean;

  @ApiProperty({
    example: [
      [
        'Speak about you Part3',
        'What is your favorite hobbies Part3?',
        'What is your name Part3?',
      ],
      [
        'Speak about you Part3',
        'What is your favorite hobbies Part3?',
        'What is your name Part3?',
      ],
    ],
    description: 'Part2 and Part3',
  })
  @IsNotEmpty()
  @IsArray()
  part2: Array<any>;

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
