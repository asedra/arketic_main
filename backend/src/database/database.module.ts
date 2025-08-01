import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './database.config';
import { DatabaseService } from './database.service';

// Import entities
import { DocumentEntity } from './entities/document.entity';
import { UserEntity } from './entities/user.entity';
import { ChatSessionEntity } from './entities/chat-session.entity';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      DocumentEntity,
      UserEntity,
      ChatSessionEntity,
      MessageEntity,
    ]),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}