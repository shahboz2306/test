import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';

interface StudentAttrs {
  id: number;
  full_name: string;
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
    type: DataType.STRING,
    allowNull: false,
  })
  audio: string;
}
