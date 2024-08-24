import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [path.join(__dirname, '..', '..', 'modules', '**', 'infra', 'typeorm', 'entities', '*.ts')],
  migrations: [path.join(__dirname, '..', 'shared', 'infra', 'typeorm', 'database', 'migrations', '*.ts')],
  cli: {
    entitiesDir: path.join('src', 'modules', '**', 'infra', 'typeorm', 'entities'),
    migrationsDir: path.join('src', 'shared', 'infra', 'typeorm', 'database', 'migrations'),
  },
  timezone: 'Z',
};
