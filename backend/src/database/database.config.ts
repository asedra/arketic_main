import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST', 'localhost'),
    port: configService.get<number>('POSTGRES_PORT', 5432),
    username: configService.get<string>('POSTGRES_USER', 'arketic_user'),
    password: configService.get<string>('POSTGRES_PASSWORD', 'arketic_password'),
    database: configService.get<string>('POSTGRES_DB', 'arketic_db'),
    schema: 'arketic',
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: !isProduction, // Don't use synchronize in production
    logging: !isProduction,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    extra: {
      connectionLimit: 10, // Connection pool size
      acquireTimeout: 60000,
      timeout: 60000,
    },
  };
};