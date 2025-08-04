import { Controller, Post, Body, Get, Logger, HttpException, HttpStatus, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AIService, ChatRequest, ChatResponse } from './ai.service';
import { VectorStoreService, StoreDocumentRequest } from './vectorstore/vectorstore.service';

@ApiTags('AI')
@Controller('ai')
export class AIController {
  private readonly logger = new Logger(AIController.name);

  constructor(
    private readonly aiService: AIService,
    private readonly vectorStoreService: VectorStoreService,
  ) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate text using AI' })
  @ApiResponse({ status: 200, description: 'Text generated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async generateText(@Body('prompt') prompt: string): Promise<ChatResponse> {
    if (!prompt || prompt.trim().length === 0) {
      throw new HttpException('Prompt is required and cannot be empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`Generate text request received`);
    return await this.aiService.generateText(prompt);
  }

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI' })
  @ApiResponse({ status: 200, description: 'Chat response generated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async chat(@Body() request: ChatRequest): Promise<ChatResponse> {
    if (!request.message || request.message.trim().length === 0) {
      throw new HttpException('Message is required and cannot be empty', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`Chat request received`);
    return await this.aiService.chat(request);
  }

  @Get('health')
  @ApiOperation({ summary: 'Check AI service health' })
  @ApiResponse({ status: 200, description: 'AI service health status' })
  async checkHealth(): Promise<{ healthy: boolean; status: string }> {
    this.logger.log(`Health check request received`);
    
    const healthy = await this.aiService.checkHealth();
    
    return {
      healthy,
      status: healthy ? 'AI service is operational' : 'AI service is not responding',
    };
  }

  @Post('documents')
  @ApiOperation({ summary: 'Store document with embeddings' })
  @ApiResponse({ status: 201, description: 'Document stored successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async storeDocument(@Body() request: StoreDocumentRequest) {
    if (!request.title || !request.content) {
      throw new HttpException('Title and content are required', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`Store document request received: ${request.title}`);
    
    const document = await this.vectorStoreService.storeDocument(request);
    
    if (!document) {
      throw new HttpException('Failed to store document', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      success: true,
      document: {
        id: document.id,
        title: document.title,
        content: document.content,
        metadata: document.metadata,
        createdAt: document.createdAt,
      },
    };
  }

  @Get('documents/search')
  @ApiOperation({ summary: 'Search documents by similarity' })
  @ApiResponse({ status: 200, description: 'Similarity search results' })
  async searchDocuments(
    @Query('query') query: string,
    @Query('limit') limit?: number,
  ) {
    if (!query || query.trim().length === 0) {
      throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`Similarity search request received`);
    
    const searchLimit = limit && limit > 0 ? Math.min(limit, 20) : 5;
    const result = await this.vectorStoreService.similaritySearch(query, searchLimit);
    
    if (!result.success) {
      throw new HttpException(result.error || 'Search failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      success: true,
      query,
      results: result.results.map(r => ({
        document: {
          id: r.document.id,
          title: r.document.title,
          content: r.document.content,
          metadata: r.document.metadata,
          createdAt: r.document.createdAt,
        },
        similarity: r.similarity,
      })),
    };
  }

  @Get('documents')
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, description: 'List of all documents' })
  async getAllDocuments() {
    this.logger.log(`Get all documents request received`);
    
    const documents = await this.vectorStoreService.getAllDocuments();
    
    return {
      success: true,
      documents: documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        metadata: doc.metadata,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })),
    };
  }
}