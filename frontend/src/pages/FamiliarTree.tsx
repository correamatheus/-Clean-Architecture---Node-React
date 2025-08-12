import { useMemo, useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { familiarService } from '../service/familiar.service';
import Tree from 'react-d3-tree';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function FamiliarTree() {
  const { data = [] } = useQuery({
    queryKey: ['familiares'],
    queryFn: familiarService.getAll
  });
  const [selected, setSelected] = useState<{ id: string; nome: string } | null>(null);
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('select');
  const nav = useNavigate();
  const treeData = useMemo(() => {
    if (!data.length) return [{ name: 'Sem dados' }];
    if (!selectedId) return [{ name: 'Selecione um familiar' }];

    const byId = Object.fromEntries(data.map(f => [f.id, { ...f, children: [] as any[] }]));
    

    data.forEach(f => {
      if (f.idPai && byId[f.idPai]) {
        byId[f.idPai].children.push(byId[f.id]);
      }
    });

    const rootNode = byId[selectedId];
    if (!rootNode) return [{ name: 'Familiar não encontrado' }];
    const mapNode = (node: any) => ({
      name: node.nome,
      attributes: { id: node.id },
      children: node.children.map((c: any) => mapNode(c))
    });

    return [mapNode(rootNode)];
  }, [data, selectedId]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDimensions({ width: el.clientWidth, height: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleNodeClick = (nodeData: any) => {
    const id = nodeData.attributes?.id;
    if (id) {
      setSelected({ id, nome: nodeData.name });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Árvore de Familiares</h2>
        <div>
          <Button onClick={() => nav('/')} variant="ghost">Voltar</Button>
        </div>
      </div>

      <div ref={containerRef} style={{ width: '100%', height: '600px' }}>
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: dimensions.width / 2, y: 50 }}
          pathFunc="elbow"
          onNodeClick={handleNodeClick}
          collapsible={true}
          zoomable
          nodeSize={{ x: 250, y: 150 }}
          separation={{ siblings: 2, nonSiblings: 2 }}
        />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalhes">
        {selected && (
          <div>
            <p><strong>Nome:</strong> {selected.nome}</p>
            <p><strong>ID:</strong> {selected.id}</p>
            <div className="mt-4">
              <Button onClick={() => { window.alert('Implementar: abrir página detalhes'); }}>Abrir detalhes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
