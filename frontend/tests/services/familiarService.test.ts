import { familiarService } from '../../src/service/familiar.service'

describe('familiarService', () => {
  it('deve criar um familiar', async () => {
    const familiar = {
      nome: 'Pedro',
      dataNascimentoISO: '1985-03-15'
    };
    const response = await familiarService.create(familiar);
    expect(response).toHaveProperty('id');
    expect(response.nome).toBe('Pedro');
  });
});