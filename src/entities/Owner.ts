import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import Entity from './Entity';
import { Status } from './enums';
import Pet from './Pet';

@TOEntity('tbl_petowner')
export default class Owner extends Entity {
  constructor(owner: Partial<Owner>) {
    super();
    Object.assign(this, owner);
  }

  @PrimaryGeneratedColumn()
  OwnerId: number;

  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @Column({ unique: true })
  OwnerName: string;

  @Column()
  OwnerAddress: string;

  @Column()
  OwnerCity: string;

  @Column()
  OwnerZip: string;

  @Column()
  OwnerMobileNo: string;

  @IsEmail()
  @Column({ unique: true })
  OwnerEmail: string;

  @OneToMany(() => Pet, (pet) => pet.PetOwnerID)
  OwnerPets: Pet[];

  @Column({ type: 'enum', enum: Status, default: Status.Yes })
  IsActive: string;
}
