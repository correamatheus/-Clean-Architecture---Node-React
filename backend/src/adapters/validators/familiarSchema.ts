import { z } from 'zod';

export const createFamiliarSchema = z.object({
  nome: z.string().min(1, 'nome é obrigatório'),
  dataNascimentoISO: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'Data de nascimento inválida'),
  identidade: z.string().min(1, 'identidade é obrigatório'),
  idPai: z.string().optional()
});
