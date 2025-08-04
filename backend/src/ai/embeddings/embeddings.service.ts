import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from '@langchain/openai';

export interface EmbeddingResult {
  embedding: number[];
  success: boolean;
  error?: string;
}

@Injectable()
export class EmbeddingsService {
  private readonly logger = new Logger(EmbeddingsService.name);
  private embeddings: OpenAIEmbeddings;

  constructor(private configService: ConfigService) {
    this.initializeEmbeddings();
  }

  private initializeEmbeddings(): void {
    try {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured for embeddings');
      }

      this.embeddings = new OpenAIEmbeddings({
        apiKey,
        model: 'text-embedding-ada-002',
        batchSize: 100,
      });

      this.logger.log('OpenAI embeddings initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize embeddings service', error.stack);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<EmbeddingResult> {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Text cannot be empty for embedding generation');
      }

      this.logger.log(`Generating embedding for text: ${text.substring(0, 50)}...`);
      
      const embedding = await this.embeddings.embedQuery(text);
      
      return {
        embedding,
        success: true,
      };
    } catch (error) {
      this.logger.error('Failed to generate embedding', error.stack);
      return {
        embedding: [],
        success: false,
        error: error.message,
      };
    }
  }

  async generateEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    try {
      if (!texts || texts.length === 0) {
        throw new Error('Text array cannot be empty');
      }

      this.logger.log(`Generating embeddings for ${texts.length} texts`);
      
      const embeddings = await this.embeddings.embedDocuments(texts);
      
      return embeddings.map(embedding => ({
        embedding,
        success: true,
      }));
    } catch (error) {
      this.logger.error('Failed to generate batch embeddings', error.stack);
      return texts.map(() => ({
        embedding: [],
        success: false,
        error: error.message,
      }));
    }
  }

  calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length');
    }

    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }
}