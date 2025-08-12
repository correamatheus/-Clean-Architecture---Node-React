import { CreateFamiliarUseCase } from '../../src/usecases/CreateFamiliarUseCase';
import { InMemoryFamiliarRepository } from '../../src/infra/db/InMemoryFamiliarRepository';

describe('CreateFamiliarUseCase', () => {
  it('Deve criar um familiar com dados válidos', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);
    const dto = { nome: 'Maria', dataNascimentoISO: '2000-02-02', idPai: null };

    const created = await uc.execute(dto);

    expect(created.id).toBeDefined();
    expect(created.nome).toBe('Maria');
    expect(created.dataNascimentoISO).toBe('2000-02-02');
    expect(created.idPai).toBeNull();
  });

  it('Deve criar um familiar com referência ao pai existente', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);
    const pai = await uc.execute({ nome: 'João', dataNascimentoISO: '1970-01-01', idPai: null });
    const dto = { nome: 'Ana', dataNascimentoISO: '2005-05-05', idPai: pai.id };

    const created = await uc.execute(dto);

    expect(created.idPai).toBe(pai.id);
  });

  it('Deve lançar erro ao criar familiar sem nome', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);
    const dto = { nome: '', dataNascimentoISO: '2010-10-10', idPai: null };

    await expect(uc.execute(dto)).rejects.toThrow('Nome é obrigatório');
  });

  it('Deve lançar erro ao criar familiar com data de nascimento inválida', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);
    const dto = { nome: 'Carlos', dataNascimentoISO: 'data-invalida', idPai: null };

    await expect(uc.execute(dto)).rejects.toThrow('Data de nascimento inválida');
  });

  it('Deve criar familiar sem informar idPai', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);
    const dto = { nome: 'Beatriz', dataNascimentoISO: '1995-03-03' };

    const created = await uc.execute(dto);

    expect(created.idPai).toBeNull();
  });
});
