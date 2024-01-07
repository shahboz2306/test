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
  count: number;
  count_type: string;
}

interface Part1Attributes {
  isPremium: boolean;
  part1: Array<string>;
  thinkingTime: any;
  speakingTime: any;
}

@Table({ tableName: 'part1' })
export class Part1 extends Model<Part1, Part1Attributes> {
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
  part1: Array<any>;

  @Column({ type: DataType.JSON, allowNull: false })
  thinkingTime: TimeStatus;

  @Column({ type: DataType.JSON, allowNull: false })
  speakingTime: TimeStatus;
}
