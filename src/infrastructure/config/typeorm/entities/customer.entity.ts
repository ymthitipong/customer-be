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

  @Column({ type: 'text', default: 'No Credit', name: 'credit_status' })
  creditStatus: string;

  @Column({ type: 'text', default: 'Active' })
  status: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    name: 'total_spend',
  })
  totalSpend: number;

  @Column({
    type: 'integer',
    default: 0,
    name: 'number_of_purchases',
  })
  numberOfPurchases: number;

  @Column({ type: 'date', name: 'active_since' })
  activeSince: string;

  @Column({ type: 'timestamptz', name: 'last_activity' })
  lastActivity: Date;

  @Column({ type: 'jsonb', name: 'recent_activity' })
  recentActivity: Activity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
