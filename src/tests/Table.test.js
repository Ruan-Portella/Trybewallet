import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';

describe('A tabela possui um cabeçalho com elementos <th> com os valores Descrição, Tag, Método de pagamento,Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir', () => {
  test('', () => {
    renderWithRedux(<Wallet />);
    const tableDescription = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    expect(tableDescription).toBeInTheDocument();

    const tableTag = screen.getByRole('columnheader', {
      name: /tag/i,
    });
    expect(tableTag).toBeInTheDocument();

    const tableMethod = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    expect(tableMethod).toBeInTheDocument();

    const tableValue = screen.getByTestId('valueth');
    expect(tableValue).toBeInTheDocument();

    const tableMoeda = screen.getByTestId('moedath');
    expect(tableMoeda).toBeInTheDocument();

    const tableCambio = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });
    expect(tableCambio).toBeInTheDocument();

    const tableValueConverted = screen.getByRole('columnheader', {
      name: /Valor convertido/i,
    });
    expect(tableValueConverted).toBeInTheDocument();

    const tableConversão = screen.getByRole('columnheader', {
      name: /Moeda de Conversão/i,
    });
    expect(tableConversão).toBeInTheDocument();

    const tableDeleted = screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    });
    expect(tableDeleted).toBeInTheDocument();
  });
});
