import { DataSource } from 'typeorm';
import { User } from '../models/user.entity';
import dotenv from 'dotenv';

dotenv.config();

export const pgDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATASOURCE,
    entities: [User],
    synchronize: true,
});

export const userRepository = pgDataSource.getRepository(User);