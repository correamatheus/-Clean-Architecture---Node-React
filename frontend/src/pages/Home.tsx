import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { familiarService } from '../service/familiar.service';
import { FamiliarList } from '../components/FamiliarList';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/ToastProvider';

export function Home() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  const { data: familiares = [], isLoading } = useQuery({
    queryKey: ['familiares'],
    queryFn: familiarService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => familiarService.delete(id),
    onSuccess: () => {
      toast.success('Sucesso', 'Familiar deletado com sucesso!');
      qc.invalidateQueries({ queryKey: ['familiares'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao deletar familiar';
      toast.error('Erro', message);
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Familiares</h1>
        <div className="space-x-2">
          <Button onClick={() => nav('/novo')}>Novo</Button>
        </div>
      </div>
      <FamiliarList 
        familiares={familiares} 
        onViewTree={(id) => nav(`/arvore?select=${id}`)} 
        onEdit={(id) => nav(`/editar/${id}`)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}

