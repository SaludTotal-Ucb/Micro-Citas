import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from './config/database';
import { initCitaRoutes } from './routes/CitaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar peticiones desde el frontend (CORS)
app.use(
  cors({
    // Cuando tengas tu URL del frontend de producción reemplazala aquí
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// Iniciar conexión con Supabase (PostgreSQL) usando TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Base de datos conectada a Supabase exitosamente.');

    // Inicializar rutas después de que TypeORM y los repositorios estén listos
    app.use('/citas', initCitaRoutes());

    // Ruta base (raíz) para comprobaciones de salud del servidor
    app.get('/', (_req, res) => {
      res.json({
        service: 'Micro-Citas API',
        status: 'UP',
        timestamp: new Date().toISOString(),
      });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a la base de datos:', error);
  });
