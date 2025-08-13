import { fireEvent, render, screen } from '@testing-library/react';
import { FamiliarForm } from '../../src/pages/FamiliarForm';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '../../src/ui/ToastProvider';

// Criar um wrapper para prover o contexto necessário
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastProvider>
        {children}
      </ToastProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('FamiliarForm', () => {
  it('deve renderizar todos os campos do formulário', () => {
    render(<FamiliarForm />, { wrapper });

    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const dataNascimentoInput = screen.getByRole('textbox', { type: /date/i });
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    expect(nomeInput).toBeInTheDocument();
    expect(dataNascimentoInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('deve mostrar erro quando tentar submeter formulário sem nome', async () => {
      render(<FamiliarForm />, { wrapper });
      const submitButton = screen.getByRole('button', { name: /salvar/i });
      const nomeInput = screen.getByPlaceholderText(/nome/i);

      fireEvent.change(nomeInput, { target: { value: '' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Validação')).toBeInTheDocument(); // Verifica o título do toast
      expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument(); // Verifica a mensagem de erro
  });

  it('deve navegar para home ao clicar em cancelar', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <QueryClientProvider client={queryClient}>
        <FamiliarForm />
      </QueryClientProvider>
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });

    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});