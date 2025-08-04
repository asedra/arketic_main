import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { DocumentEntity } from '../../database/entities/document.entity';
import { EmbeddingsService } from '../embeddings/embeddings.service';

export interface DocumentWithSimilarity {
  document: DocumentEntity;
  similarity: number;
}

export interface SimilaritySearchResult {
  results: DocumentWithSimilarity[];
  success: boolean;
  error?: string;
}

export interface StoreDocumentRequest {
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);

  constructor(
    @InjectRepository(DocumentEntity)
    private documentRepository: Repository<DocumentEntity>,
    private embeddingsService: EmbeddingsService,
  ) {}

  async storeDocument(request: StoreDocumentRequest): Promise<DocumentEntity | null> {
    try {
      this.logger.log(`Storing document: ${request.title}`);

      // Generate embedding for the content
      const embeddingResult = await this.embeddingsService.generateEmbedding(request.content);
      
      if (!embeddingResult.success) {
        this.logger.error('Failed to generate embedding for document');
        return null;
      }

      // Create and save the document
      const document = this.documentRepository.create({
        title: request.title,
        content: request.content,
        embedding: JSON.stringify(embeddingResult.embedding),
        metadata: request.metadata || {},
      });

      const savedDocument = await this.documentRepository.save(document);
      this.logger.log(`Document stored successfully with ID: ${savedDocument.id}`);
      
      return savedDocument;
    } catch (error) {
      this.logger.error('Failed to store document', error.stack);
      return null;
    }
  }

  async similaritySearch(query: string, limit: number = 5): Promise<SimilaritySearchResult> {
    try {
      this.logger.log(`Performing similarity search for: ${query.substring(0, 50)}...`);

      // Generate embedding for the query
      const queryEmbeddingResult = await this.embeddingsService.generateEmbedding(query);
      
      if (!queryEmbeddingResult.success) {
        return {
          results: [],
          success: false,
          error: 'Failed to generate query embedding',
        };
      }

      // Get all documents with embeddings
      const documents = await this.documentRepository.find({
        where: { embedding: Not(IsNull()) },
      });

      if (documents.length === 0) {
        return {
          results: [],
          success: true,
        };
      }

      // Calculate similarities
      const resultsWithSimilarity: DocumentWithSimilarity[] = [];
      
      for (const document of documents) {
        try {
          const docEmbedding = JSON.parse(document.embedding);
          const similarity = this.embeddingsService.calculateCosineSimilarity(
            queryEmbeddingResult.embedding,
            docEmbedding
          );
          
          resultsWithSimilarity.push({
            document,
            similarity,
          });
        } catch (error) {
          this.logger.warn(`Failed to parse embedding for document ${document.id}`);
        }
      }

      // Sort by similarity (highest first) and limit results
      const sortedResults = resultsWithSimilarity
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

      return {
        results: sortedResults,
        success: true,
      };
    } catch (error) {
      this.logger.error('Failed to perform similarity search', error.stack);
      return {
        results: [],
        success: false,
        error: error.message,
      };
    }
  }

  async getAllDocuments(): Promise<DocumentEntity[]> {
    try {
      return await this.documentRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Failed to get all documents', error.stack);
      return [];
    }
  }

  async getDocumentById(id: number): Promise<DocumentEntity | null> {
    try {
      return await this.documentRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to get document with ID ${id}`, error.stack);
      return null;
    }
  }

  async deleteDocument(id: number): Promise<boolean> {
    try {
      const result = await this.documentRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      this.logger.error(`Failed to delete document with ID ${id}`, error.stack);
      return false;
    }
  }
}

