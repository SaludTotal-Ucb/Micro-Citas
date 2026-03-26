import { Router } from 'express';
import type { CitaController } from '../controllers/CitaController';
import { CitaService } from '../services/CitaService';
// Importa tus repositorios desde dataSource (Data Source de TypeORM)
// import { AppDataSource } from '../config/database';
// import { Cita } from '../entities/Cita';
// import { Penalizacion } from '../entities/Penalizacion';

const router = Router();

// Para el ejemplo, instanciamos de forma ilustrativa. En tu proyecto inyectarías via AppDataSource
// const citaService = new CitaService(AppDataSource.getRepository(Cita), AppDataSource.getRepository(Penalizacion));
// const citaController = new CitaController(citaService);

// Mock controller setup para tipado y exportación limpia:
export const setCitaRoutes = (citaController: CitaController) => {
  // POST /citas - Agendar nueva cita
  router.post('/', (req, res) => citaController.crearCita(req, res));

  // GET /citas/paciente/:id - Listar citas por paciente
  router.get('/paciente/:id', (req, res) =>
    citaController.obtenerPorPaciente(req, res),
  );

  // GET /citas/medico/:id - Listar citas por medico
  router.get('/medico/:id', (req, res) =>
    citaController.obtenerPorMedico(req, res),
  );

  // PATCH /citas/:id/estado - Cancelar, Completar o Marcar como ausente
  router.patch('/:id/estado', (req, res) =>
    citaController.cambiarEstado(req, res),
  );

  // PATCH /citas/:id/notas - Editar notas del doctor
  router.patch('/:id/notas', (req, res) =>
    citaController.editarNotas(req, res),
  );

  // PUT /citas/:id - Actualizar detalles generales de la cita (fecha, hora, clinica, etc)
  router.put('/:id', (req, res) => citaController.actualizarDetalles(req, res));

  return router;
};

export default router;
