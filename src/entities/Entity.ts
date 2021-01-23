import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { classToPlain } from 'class-transformer';

export default abstract class Entity extends BaseEntity {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
