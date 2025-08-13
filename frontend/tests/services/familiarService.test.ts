import { familiarService } from '../../src/service/familiar.service'

describe('familiarService', () => {
  it('deve criar um familiar', async () => {
    const familiar = {
      nome: 'Pedro',
      dataNascimentoISO: '1985-03-15',
      identidade: '123456789'
    };
    const response = await familiarService.create(familiar);
    expect(response).toHaveProperty('id');
    expect(response.nome).toBe('Pedro');
  });
});