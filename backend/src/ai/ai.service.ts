import { Injectable, Logger } from '@nestjs/common';
import { OpenAIProvider } from './providers/openai.provider';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export interface ChatRequest {
  message: string;
  systemPrompt?: string;
  temperature?: number;
}

export interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  constructor(private readonly openAIProvider: OpenAIProvider) {}

  async generateText(prompt: string): Promise<ChatResponse> {
    try {
      this.logger.log(`Generating text for prompt: ${prompt.substring(0, 50)}...`);
      
      const chatModel = this.openAIProvider.getChatModel();
      const response = await chatModel.invoke(prompt);
      
      return {
        response: response.content as string,
        success: true,
      };
    } catch (error) {
      this.logger.error('Failed to generate text', error.stack);
      return {
        response: '',
        success: false,
        error: error.message,
      };
    }
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      this.logger.log(`Processing chat request: ${request.message.substring(0, 50)}...`);
      
      const chatModel = this.openAIProvider.getChatModel();
      const messages = [];

      if (request.systemPrompt) {
        messages.push(new SystemMessage(request.systemPrompt));
      }
      
      messages.push(new HumanMessage(request.message));

      const response = await chatModel.invoke(messages);
      
      return {
        response: response.content as string,
        success: true,
      };
    } catch (error) {
      this.logger.error('Failed to process chat request', error.stack);
      return {
        response: '',
        success: false,
        error: error.message,
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      return await this.openAIProvider.testConnection();
    } catch (error) {
      this.logger.error('AI service health check failed', error.stack);
      return false;
    }
  }
}