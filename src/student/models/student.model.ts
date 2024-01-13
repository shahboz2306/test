import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';

interface StudentAttrs {
  id: number;
  full_name: string;
  part1: number;
  part2: number;
  part3: number;
  audio: string;
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part1: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part2: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part3: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  audio: string;
}
