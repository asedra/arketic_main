import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { ChatSessionEntity } from './chat-session.entity';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

@Entity('messages')
@Check(`"role" IN ('user', 'assistant', 'system')`)
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'int',
    name: 'chat_session_id' 
  })
  chatSessionId: number;

  @ManyToOne(() => ChatSessionEntity, chatSession => chatSession.messages, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'chat_session_id' })
  chatSession: ChatSessionEntity;

  @Column({ 
    type: 'enum',
    enum: MessageRole,
    enumName: 'message_role'
  })
  role: MessageRole;

  @Column({ type: 'text' })
  content: string;

  @Column({ 
    type: 'jsonb', 
    default: {} 
  })
  metadata: Record<string, any>;

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    name: 'created_at' 
  })
  createdAt: Date;
}