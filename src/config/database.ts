import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Cita } from '../entities/Cita';
import { Penalizacion } from '../entities/Penalizacion';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // ¡En producción cambia a false y usa migraciones!
  logging: false,
  entities: [Cita, Penalizacion],
  subscribers: [],
  migrations: [],
  // Configuraciones recomendadas para conexiones en la nube como Supabase:
  ssl: {
    rejectUnauthorized: false,
  },
});
