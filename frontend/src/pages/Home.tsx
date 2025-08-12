import { useQuery } from '@tanstack/react-query';
import { familiarService } from '../service/familiar.service';
import { FamiliarList } from '../components/FamiliarList';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const nav = useNavigate();
  const { data: familiares = [], isLoading } = useQuery({
    queryKey: ['familiares'],
    queryFn: familiarService.getAll,
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Familiares</h1>
        <div className="space-x-2">
          <Button onClick={() => nav('/novo')}>Novo</Button>
          <Button variant="ghost" onClick={() => nav('/arvore')}>Árvore</Button>
        </div>
      </div>
      <FamiliarList familiares={familiares} onSelect={(id) => nav(`/arvore?select=${id}`)} />
    </div>
  );
}
