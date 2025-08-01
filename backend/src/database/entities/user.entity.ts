import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChatSessionEntity } from './chat-session.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
    length: 50, 
    unique: true 
  })
  username: string;

  @Column({ 
    type: 'varchar', 
    length: 255, 
    unique: true 
  })
  email: string;

  @Column({ 
    type: 'varchar', 
    length: 255,
    name: 'password_hash' 
  })
  passwordHash: string;

  @OneToMany(() => ChatSessionEntity, chatSession => chatSession.user)
  chatSessions: ChatSessionEntity[];

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    name: 'created_at' 
  })
  createdAt: Date;

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    name: 'updated_at' 
  })
  updatedAt: Date;
}