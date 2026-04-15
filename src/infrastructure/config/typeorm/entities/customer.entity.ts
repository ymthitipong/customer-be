import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

type Activity = {
  action: string;
  time: string;
};

@Entity('customer')
export class CustomerTypeormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  company: string;

  @Column({ type: 'text' })
  initials: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  salesperson: string;

  @Column({ type: 'text', default: 'No Credit' })
  credit_status: string;

  @Column({ type: 'text', default: 'Active' })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_spend: number;

  @Column({ type: 'integer', default: 0 })
  number_of_purchases: number;

  @Column({ type: 'date' })
  active_since: string;

  @Column({ type: 'timestamptz' })
  last_activity: Date;

  @Column({ type: 'jsonb' })
  recent_activity: Activity[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
