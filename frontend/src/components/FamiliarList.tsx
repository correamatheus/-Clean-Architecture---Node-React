import type { Familiar } from '../core/familiar.types';
import { Card } from '../ui/Card';

export function FamiliarList({ familiares, onSelect }: { familiares: Familiar[]; onSelect?: (id: string) => void }) {
  return (
    <div className="grid gap-2">
      {familiares.map((f) => (
        <Card key={f.id} className="flex justify-between items-center">
          <div>
            <div className="font-medium">{f.nome}</div>
            <div className="text-sm text-gray-500">{new Date(f.dataNascimentoISO).toLocaleDateString()}</div>
          </div>
          {onSelect && <button className="text-indigo-600" onClick={() => onSelect(f.id)}>Ver</button>}
        </Card>
      ))}
    </div>
  );
}
