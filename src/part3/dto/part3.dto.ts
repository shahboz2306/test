import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Part3Dto {
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
    description: 'Part3 of parts',
  })
  @IsNotEmpty()
  @IsArray()
  part3: Array<string>;

  @ApiProperty({
    example: 1,
    description: 'Id of part2',
  })
  @IsNotEmpty()
  @IsNumber()
  part2_id: number;

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
