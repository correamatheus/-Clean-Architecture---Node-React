import { render, screen } from '@testing-library/react';
import { FamiliarList } from '../../src/components/FamiliarList';
import { Familiar } from '../../src/core/familiar.types';

describe('FamiliarList', () => {
  it('deve renderizar lista de familiares corretamente', () => {
    const familiares = [
      { id: '1', nome: 'João', dataNascimentoISO: '1990-01-01', idPai: null },
      { id: '2', nome: 'Maria', dataNascimentoISO: '1995-05-05', idPai: null }
    ];

    render(<FamiliarList familiares={familiares} />);

    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });

  
});