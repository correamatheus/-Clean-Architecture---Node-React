import { render, screen, fireEvent } from '@testing-library/react';
import { FamiliarForm } from '../../src/pages/FamiliarForm';
import userEvent from '@testing-library/user-event';

describe('FamiliarForm', () => {
  it('deve renderizar todos os campos do formulário', () => {
    // Arrange
    render(<FamiliarForm />);

    // Act
    const nomeInput = screen.getByLabelText(/nome/i);
    const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    // Assert
    expect(nomeInput).toBeInTheDocument();
    expect(dataNascimentoInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});