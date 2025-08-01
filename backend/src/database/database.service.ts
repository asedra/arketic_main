import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async testConnection(): Promise<{ status: string; info: any }> {
    try {
      // Test basic connection
      const isConnected = this.dataSource.isInitialized;
      
      // Test query execution
      const result = await this.dataSource.query('SELECT version() as version, current_database() as database');
      
      // Test PGVector extension
      const vectorExtension = await this.dataSource.query(
        "SELECT * FROM pg_extension WHERE extname = 'vector'"
      );

      return {
        status: 'success',
        info: {
          connected: isConnected,
          database: result[0]?.database,
          version: result[0]?.version?.substring(0, 50) + '...',
          pgvector: vectorExtension.length > 0 ? 'installed' : 'not installed',
          schema: await this.dataSource.query('SELECT current_schema()'),
        }
      };
    } catch (error) {
      return {
        status: 'error',
        info: {
          message: error.message,
          code: error.code,
        }
      };
    }
  }

  async createSampleDocument(title: string, content: string): Promise<DocumentEntity> {
    const document = this.documentRepository.create({
      title,
      content,
      metadata: { 
        type: 'sample',
        createdBy: 'system',
        version: '1.0' 
      }
    });

    return await this.documentRepository.save(document);
  }

  async getAllDocuments(): Promise<DocumentEntity[]> {
    return await this.documentRepository.find({
      order: { createdAt: 'DESC' }
    });
  }
}