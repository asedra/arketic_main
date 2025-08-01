import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ 
    type: 'text', 
    nullable: true,
    comment: 'OpenAI embedding vector (1536 dimensions) - stored as JSON text' 
  })
  embedding: string;

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

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    name: 'updated_at' 
  })
  updatedAt: Date;
}