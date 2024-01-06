import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Max,
} from 'class-validator';

export class QuestionDto {
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
    description: 'Questions of parts',
  })
  @IsNotEmpty()
  @IsArray()
  questions: Array<string>;

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

  @ApiProperty({
    example: '1',
    description: 'Parts number',
  })
  @IsNotEmpty()
  @IsNumber()
  part_number: number;
}
