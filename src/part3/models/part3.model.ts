import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Part2 } from '../../part2/models/part2.model';

interface TimeStatus {
  count: number;
  count_type: string;
}

interface Part3Attributes {
  isPremium: boolean;
  part3: Array<string>;
  part2_id: number;
  thinkingTime: any;
  speakingTime: any;
}

@Table({ tableName: 'part3' })
export class Part3 extends Model<Part3, Part3Attributes> {
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
  part3: Array<any>;

  @ForeignKey(() => Part2)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part2_id: number;

  @BelongsTo(() => Part2)
  part2: Part2;

  @Column({ type: DataType.JSON, allowNull: false })
  thinkingTime: TimeStatus;

  @Column({ type: DataType.JSON, allowNull: false })
  speakingTime: TimeStatus;
}
