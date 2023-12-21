import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  salary: number;

  @Column()
  job: string;

  @Column()
  location: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Report with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Report with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Report with id', this.id);
  }
}
