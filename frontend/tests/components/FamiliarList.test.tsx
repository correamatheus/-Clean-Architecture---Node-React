import { render, screen } from '@testing-library/react';
import { FamiliarList } from '../../src/components/FamiliarList';

describe('FamiliarList', () => {
  it('deve renderizar lista de familiares corretamente', () => {
    // Arrange
    const familiares = [
      { id: '1', nome: 'João', dataNascimentoISO: '1990-01-01', idPai: null },
      { id: '2', nome: 'Maria', dataNascimentoISO: '1995-05-05', idPai: null }
    ];

    // Act
    render(<FamiliarList familiares={familiares} />);

    // Assert
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });
});