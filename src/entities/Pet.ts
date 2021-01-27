import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Owner from './Owner';
import Entity from './Entity';
import { Gender, Status } from './enums';

@TOEntity('tbl_pet')
export default class Pet extends Entity {
  constructor(pet: Partial<Pet>) {
    super();
    Object.assign(this, pet);
  }

  @PrimaryGeneratedColumn()
  PetID: number;

  @Column({ unique: true })
  PetName: string;

  @Column()
  PetType: string;

  @Column()
  PetBreed: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  PetBdate: string;

  @Column({ type: 'enum', enum: Gender })
  PetGender: string;

  @Column({ type: 'text' })
  PetNotes: string;

  @ManyToOne(() => Owner, (user) => user.OwnerPets)
  PetOwnerID: number;

  @Column({ type: 'enum', enum: Status, default: Status.Yes })
  IsActive: string;
}
