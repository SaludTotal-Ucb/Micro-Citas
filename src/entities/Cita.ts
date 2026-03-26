import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CitaEstado {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ABSENT = 'absent', // Añadido para manejar el estado 'ausente'
}

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  paciente_id!: string;

  @Column('uuid')
  medico_id!: string;

  @Column('uuid')
  clinica_id!: string;

  @Column({ type: 'varchar' })
  especialidad!: string;

  // Formato YYYY-MM-DD
  @Column({ type: 'varchar', length: 10 })
  fecha!: string;

  // Formato HH:mm
  @Column({ type: 'varchar', length: 5 })
  hora!: string;

  @Column({ type: 'text', nullable: true })
  motivo?: string;

  @Column({ type: 'enum', enum: CitaEstado, default: CitaEstado.PENDING })
  estado!: CitaEstado;

  @Column({ type: 'text', nullable: true })
  notas_doctor?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
