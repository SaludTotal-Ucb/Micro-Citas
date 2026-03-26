import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from './config/database';
import { initCitaRoutes } from './routes/CitaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Iniciar conexión con Supabase (PostgreSQL) usando TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Base de datos conectada a Supabase exitosamente.');

    // Inicializar rutas después de que TypeORM y los repositorios estén listos
    app.use('/citas', initCitaRoutes());

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a la base de datos:', error);
  });
