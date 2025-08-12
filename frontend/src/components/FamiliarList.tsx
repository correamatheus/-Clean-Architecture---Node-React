import type { Familiar } from '../core/familiar.types';
import { Card } from '../ui/Card';
import { FaFolderTree, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

export function FamiliarList({ familiares, onViewTree, onEdit, onDelete }: { familiares: Familiar[]; onViewTree?: (id: string) => void, onEdit?: (id: string) => void, onDelete?: (id: string) => void }) {
  return (
    <div className="grid gap-2">
      {familiares.map((f) => (
        <Card key={f.id} className="flex justify-between items-center">
          <div>
            <div className="font-medium">{f.nome}</div>
            <div className="text-sm text-gray-500">{new Date(f.dataNascimentoISO).toLocaleDateString()}</div>
          </div>
          <div className="flex justify-between items-center gap-2">
            {onViewTree && <button className="text-indigo-600" onClick={() => onViewTree(f.id)}><FaFolderTree title='Árvore Genealógica'/></button>}
            {onEdit && <button className="text-indigo-600" onClick={() => onEdit(f.id)}><FaPenToSquare title='Editar'/></button>}
            {onDelete && <button className="text-indigo-600" onClick={() => onDelete(f.id)}><FaTrashCan title='Deletar'/></button>}
          </div>
          
        </Card>
      ))}
    </div>
  );
}
