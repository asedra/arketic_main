import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity('chat_sessions')
export class ChatSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'int',
    name: 'user_id' 
  })
  userId: number;

  @ManyToOne(() => UserEntity, user => user.chatSessions, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ 
    type: 'varchar',
    length: 36,
    name: 'session_id',
    default: () => 'gen_random_uuid()'
  })
  sessionId: string;

  @Column({ 
    type: 'varchar', 
    length: 255, 
    default: 'New Chat' 
  })
  title: string;

  @OneToMany(() => MessageEntity, message => message.chatSession)
  messages: MessageEntity[];

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