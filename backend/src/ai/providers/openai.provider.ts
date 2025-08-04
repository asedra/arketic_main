import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class OpenAIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private chatModel: ChatOpenAI;

  constructor(private configService: ConfigService) {
    this.initializeOpenAI();
  }

  private initializeOpenAI(): void {
    try {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured in environment variables');
      }

      this.chatModel = new ChatOpenAI({
        apiKey,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
      });

      this.logger.log('OpenAI provider initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize OpenAI provider', error.stack);
      throw error;
    }
  }

  getChatModel(): ChatOpenAI {
    if (!this.chatModel) {
      throw new Error('OpenAI chat model is not initialized');
    }
    return this.chatModel;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.chatModel.invoke('Test connection');
      this.logger.log('OpenAI connection test successful');
      return true;
    } catch (error) {
      this.logger.error('OpenAI connection test failed', error.stack);
      return false;
    }
  }
}