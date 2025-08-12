import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { familiarService } from '../service/familiar.service';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useToast } from '../hooks/useToast';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  dataNascimentoISO: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'Data inválida'),
  idPai: z.string().optional().nullable()
});

export function FamiliarForm() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  const { data: familiares = [] } = useQuery({
    queryKey: ['familiares'],
    queryFn: familiarService.getAll
  });

  const mutation = useMutation<
    { nome: string; dataNascimentoISO: string; idPai?: string | null },
    unknown,
    { nome: string; dataNascimentoISO: string; idPai?: string | null }
  >({
    mutationFn: familiarService.create,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['familiares'] });
        toast.success('Familiar criado', 'Cadastro realizado com sucesso');
        nav('/');
      },
      onError: (err) => {
        toast.error('Erro', 'Não foi possível criar');
      }
    }
  );

  const [form, setForm] = useState({ nome: '', dataNascimentoISO: '', idPai: '' });

  const handleSubmit = () => {
    const parsed = schema.safeParse({ ...form, idPai: form.idPai === '' ? null : form.idPai });
    if (!parsed.success) {
      toast.error('Validação', parsed.error.issues.map(e => e.message).join(', '));
      return;
    }
    const data = { ...parsed.data };
    if (data.idPai === null) {
      delete data.idPai;
    }
    mutation.mutate(data);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Novo Familiar</h2>
      <div className="space-y-3">
        <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm(s => ({ ...s, nome: e.target.value }))} />
        <Input type="date" value={form.dataNascimentoISO} onChange={(e) => setForm(s => ({ ...s, dataNascimentoISO: e.target.value }))} />
        <select className="w-full p-2 border rounded-md" value={form.idPai} onChange={(e) => setForm(s => ({ ...s, idPai: e.target.value }))}>
          <option value="">— Sem pai —</option>
          {familiares.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Salvar</Button>
          <Button variant="ghost" onClick={() => nav('/')}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
