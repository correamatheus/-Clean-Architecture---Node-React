import { InMemoryFamiliarRepository } from '../../src/infra/db/InMemoryFamiliarRepository';
import { Familiar } from '../../src/domain/entities/Familiar';
import { randomUUID } from 'crypto';

describe('InMemoryFamiliarRepository', () => {
  it('Deve criar, buscar e atualizar corretamente', async () => {
    const repo = new InMemoryFamiliarRepository();
    const f = new Familiar({
      id: randomUUID(),
      nome: 'João',
      dataNascimentoISO: '1990-01-01',
      idPai: null
    });

    const created = await repo.create(f);
    expect(created.id).toBe(f.id);

    const found = await repo.findById(f.id);
    expect(found).not.toBeNull();
    expect(found!.nome).toBe('João');

    const updated = await repo.update(f.id, { nome: 'João Atualizado' });
    expect(updated).not.toBeNull();
    expect(updated!.nome).toBe('João Atualizado');

    const all = await repo.findAll();
    expect(all.length).toBe(1);

    const deleted = await repo.delete(f.id);
    expect(deleted).toBeTruthy();
  });
});
