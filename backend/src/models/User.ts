import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,
} from 'typeorm';

import bcrypt from 'bcryptjs';

@Entity('users')
export default class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  resetToken: string;

  @Column()
  resetTokenExpires: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
