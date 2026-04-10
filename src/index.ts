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
    origin: [
      'http://localhost:5174',
      'http://localhost',
      'http://127.0.0.1:5174',
      'http://127.0.0.1',
    ],
    // La URL de tu Frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Habilitar si en el futuro envías cookies o tokens de sesión
  }),
);

app.use(express.json());

// Iniciar conexión con Supabase (PostgreSQL) usando TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Base de datos conectada a Supabase exitosamente.');

    // Inicializar rutas después de que TypeORM y los repositorios estén listos
    app.use('/api/citas', initCitaRoutes()); // ← Añadido el prefijo /api

    // Ruta base (raíz) para comprobaciones de salud del servidor
    app.get('/api', (_req, res) => {
      // ← También actualizada la ruta base opcional
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
