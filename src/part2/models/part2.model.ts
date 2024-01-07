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

interface Part2Attributes {
  isPremium: boolean;
  part2: Array<string>;
  thinkingTime: any;
  speakingTime: any;
}

@Table({ tableName: 'part2' })
export class Part2 extends Model<Part2, Part2Attributes> {
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
    type: DataType.ARRAY(DataType.ARRAY(DataType.STRING)),
    allowNull: false,
  })
  part2: Array<any>;

  @Column({ type: DataType.JSON, allowNull: false })
  thinkingTime: TimeStatus;

  @Column({ type: DataType.JSON, allowNull: false })
  speakingTime: TimeStatus;
}
