import { CreateFamiliarUseCase } from '../../src/usecases/CreateFamiliarUseCase';
import { InMemoryFamiliarRepository } from '../../src/infra/db/InMemoryFamiliarRepository';

describe('CreateFamiliarUseCase', () => {
  it('deve criar um familiar', async () => {
    const repo = new InMemoryFamiliarRepository();
    const uc = new CreateFamiliarUseCase(repo);

    const dto = {
      nome: 'Maria',
      dataNascimentoISO: '2000-02-02',
      idPai: null
    };

    const created = await uc.execute(dto);
    expect(created.id).toBeDefined();
    expect(created.nome).toBe('Maria');
  });
});
