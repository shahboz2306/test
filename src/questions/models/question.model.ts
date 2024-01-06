import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

interface TimeStatus {
  count: number,
  count_type: string,
}

interface QuestionAttributes {
  isPremium: boolean;
  questions: Array<string>;
  thinkingTime: any;
  speakingTime: any;
  part_number: number;
}

@Table({ tableName: 'question' })
export class Question extends Model<Question, QuestionAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPremium: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  questions: Array<any>;

  @Column({ type: DataType.JSON })
  thinkingTime: TimeStatus;

  @Column({ type: DataType.JSON })
  speakingTime: TimeStatus;

  @Column({
    type: DataType.INTEGER,
  })
  part_number: number;
}
