import { z } from 'zod';

export const createFamiliarSchema = z.object({
  nome: z.string().min(1, 'nome é obrigatório'),
  dataNascimentoISO: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'dataNascimentoISO inválida'),
  idPai: z.string().optional()
});
