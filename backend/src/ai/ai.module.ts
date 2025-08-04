import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { OpenAIProvider } from './providers/openai.provider';
import { EmbeddingsService } from './embeddings/embeddings.service';
import { VectorStoreService } from './vectorstore/vectorstore.service';
import { DocumentEntity } from '../database/entities/document.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DocumentEntity]),
  ],
  controllers: [AIController],
  providers: [
    OpenAIProvider,
    AIService,
    EmbeddingsService,
    VectorStoreService,
  ],
  exports: [AIService, EmbeddingsService, VectorStoreService], // Export for use in other modules
})
export class AIModule {}