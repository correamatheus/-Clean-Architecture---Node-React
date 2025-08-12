import { familiarService } from '../../src/service/familiar.service'

describe('familiarService', () => {
  it('deve criar um familiar', async () => {
    // Arrange
    const familiar = {
      nome: 'Pedro',
      dataNascimentoISO: '1985-03-15'
    };

    // Act
    const response = await familiarService.create(familiar);

    // Assert
    expect(response).toHaveProperty('id');
    expect(response.nome).toBe('Pedro');
  });
});