import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { familiarService } from "../service/familiar.service";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import type { CreateFamiliarDto } from "../core/familiar.types";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/ToastProvider";
import z from "zod";

export function FamiliarForm() {
  const { id } = useParams<{ id?: string }>();
  const nav = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();

  const schema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    dataNascimentoISO: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'Data inválida'),
    identidade: z.string().min(1, 'Identidade é obrigatório'),
    idPai: z.string().optional().nullable()
  });

  const isEditMode = !!id;

  const [form, setForm] = useState({ nome: '', identidade: '', dataNascimentoISO: '', idPai: '' });

  const { data: familiares = [] } = useQuery({
    queryKey: ['familiares'],
    queryFn: familiarService.getAll
  });

  const { data: familiarData } = useQuery({
    queryKey: ['familiar', id],
    queryFn: () => (id ? familiarService.getById(id) : null),
    enabled: isEditMode
  });

  useEffect(() => {
    if (familiarData) {
      setForm({
        nome: familiarData.familiar.nome,
        dataNascimentoISO: familiarData.familiar.dataNascimentoISO,
        identidade: familiarData.familiar.identidade,
        idPai: familiarData.familiar.idPai || ''
      });
    }
  }, [familiarData]);

  const updateMutation = useMutation({
    mutationFn: (params: { id: string } & CreateFamiliarDto) =>
      familiarService.update(params.id, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['familiares'] });
      toast.success('Familiar atualizado', 'Edição realizada com sucesso');
      nav('/');
    },
    onError: () => {
      toast.error('Erro', 'Não foi possível atualizar');
    }
  });

  const createMutation = useMutation({
    mutationFn: familiarService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['familiares'] });
      toast.success('Familiar criado', 'Cadastro realizado com sucesso');
      nav('/');
    },
    onError: () => {
      toast.error('Erro', 'Não foi possível criar');
    }
  });

  const handleSubmit = () => {
    const parsed = schema.safeParse({
      ...form,
      idPai: form.idPai === '' ? null : form.idPai
    });

    if (!parsed.success) {
      toast.error(
        'Validação',
        parsed.error.issues.map((e) => e.message).join(', ')
      );
      return;
    }

    const data = { ...parsed.data };
    if (data.idPai === null) delete data.idPai;

    if (isEditMode && id) {
      updateMutation.mutate({ id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Editar Familiar' : 'Novo Familiar'}
      </h2>

      <div className="space-y-3">
        <Input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm((s) => ({ ...s, nome: e.target.value }))}
        />

         <Input
          placeholder="Identidade"
          value={form.identidade}
          onChange={(e) => setForm((s) => ({ ...s, identidade: e.target.value }))}
        />

        <Input
          data-testid="dataNascimentoISO"
          type="date"
          value={form.dataNascimentoISO}
          onChange={(e) =>
            setForm((s) => ({ ...s, dataNascimentoISO: e.target.value }))
          }
        />

        <select
          className="w-full p-2 border rounded-md"
          value={form.idPai}
          onChange={(e) => setForm((s) => ({ ...s, idPai: e.target.value }))}
        >
          <option value="">— Sem pai —</option>
          {familiares
            .filter((f) => !isEditMode || f.id !== id)
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome}
              </option>
            ))}
        </select>

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEditMode ? 'Atualizar' : 'Salvar'}
          </Button>

          <Button variant="ghost" onClick={() => nav('/')}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
