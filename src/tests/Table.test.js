import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
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

  test('A tabela é atualizada com as informações vindas da chave expense do estado global.', () => {
    const alimentacao = 'Alimentação';
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'USDT',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [{
          id: 0,
          value: '001',
          description: 'ruan',
          currency: 'USD',
          method: 'Dinheiro',
          tag: alimentacao,
          exchangeRates: mockData,
        }],
      },
    };
    renderWithRedux(<Wallet />, { initialState });

    const description = screen.getByRole('cell', {
      name: /ruan/i,
    });

    const tag = screen.getByRole('cell', {
      name: /alimentação/i,
    });

    const method = screen.getByRole('cell', {
      name: /dinheiro/i,
    });

    const currency = screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });

    expect(description.textContent).toBe('ruan');
    expect(tag.textContent).toBe('Alimentação');
    expect(method.textContent).toBe('Dinheiro');
    expect(currency.textContent).toBe('Dólar Americano/Real Brasileiro');
  });

  test('O campo para selecionar uma categoria (tag) da despesa possui options com os valores Alimentação, Lazer, Trabalho, Transporte e Saúde.', async () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'USDT',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [{
          id: 0,
          value: '1',
          description: 'ruan',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Troco',
          exchangeRates: mockData,
        }],
      },
    };
    const { store } = renderWithRedux(<Wallet />, { initialState });
    const totalField = screen.getByTestId('total-field');
    expect(totalField.innerHTML).toBe('4.75');
    const buttonDelete = screen.getByRole('button', {
      name: /excluir/i,
    });
    userEvent.click(buttonDelete);
    expect(store.getState().wallet.expenses).toEqual([]);
    expect(totalField.innerHTML).toBe('0.00');
  });
  test('Testa se quando editar ele muda', () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'USDT',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [{
          id: 0,
          value: '1',
          description: 'ruan',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Troco',
          exchangeRates: mockData,
        }],
      },
    };
    renderWithRedux(<Wallet />, { initialState });
    const buttonEdit = screen.getByRole('button', {
      name: /editar/i,
    });
    userEvent.click(buttonEdit);
    const inputName = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const buttonElement = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(inputName.value).toBe('1');
    expect(inputDescription.value).toBe('ruan');
    expect(buttonElement).toBeInTheDocument();
    userEvent.clear(inputDescription);
    userEvent.type(inputDescription, 'ruan/2');
    userEvent.click(buttonElement);
    const inputValueTable = screen.getByRole('cell', {
      name: /ruan/i,
    });
    expect(inputValueTable.textContent).toBe('ruan/2');
  });
});
