import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa o component WalletForm', () => {
  test('O campo para adicionar o valor da despesa possui o data-testid="value-input".', () => {
    renderWithRedux(<Wallet />);
    const InputValue = screen.getByTestId('value-input');
    expect(InputValue).toBeInTheDocument();
  });

  test('O campo para adicionar a descrição da despesa possui o data-testid="description-input', () => {
    renderWithRedux(<Wallet />);
    const InputDescription = screen.getByTestId('description-input');
    expect(InputDescription).toBeInTheDocument();
  });

  test('O campo para selecionar em qual moeda será registrada a despesa possui o data-testid="currency-input', () => {
    jest.spyOn(global, 'fetch');
    renderWithRedux(<Wallet />);
    const selectCurrency = screen.getByTestId('currency-input');
    expect(selectCurrency).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  test('A API é chamada com o endpoint https://economia.awesomeapi.com.br/json/all', () => {
    jest.spyOn(global, 'fetch');
    renderWithRedux(<Wallet />);
    const selectCurrency = screen.getByTestId('currency-input');
    expect(selectCurrency).toBeInTheDocument();
    expect(fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  test.skip('O valor da chave currencies no estado global é um array que possui as siglas das moedas que vieram da API.', async () => {

  });

  test.skip('O campo para selecionar em qual moeda será registrada a despesa possui options com os valores iguais ao do array localizado na chave currencies do estado global.', async () => {

  });
  test('O campo para selecionar qual método de pagamento será utilizado possui o data-testid="method-input"', async () => {
    renderWithRedux(<Wallet />);
    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect).toBeInTheDocument();
  });
  test('O campo para selecionar qual método de pagamento será utilizado possui options com os valores Dinheiro, Cartão de crédito e Cartão de débito', async () => {
    renderWithRedux(<Wallet />);
    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect.textContent).toBe('DinheiroCartão de créditoCartão de débito');
  });
  test('O campo para selecionar uma categoria (tag) da despesa possui o data-testid="tag-input"', async () => {
    renderWithRedux(<Wallet />);
    const tagSelect = screen.getByTestId('tag-input');
    expect(tagSelect).toBeInTheDocument();
  });
  test('O campo para selecionar uma categoria (tag) da despesa possui options com os valores Alimentação, Lazer, Trabalho, Transporte e Saúde.', async () => {
    renderWithRedux(<Wallet />);
    const tagSelect = screen.getByTestId('tag-input');
    expect(tagSelect.textContent).toBe('AlimentaçãoLazerTrabalhoTransporteSaúde');
  });
  test('É renderizado um botão com o texto "Adicionar despesa".', async () => {
    renderWithRedux(<Wallet />);
    const buttonEl = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(buttonEl).toBeInTheDocument();
  });
  test('Ao clicar no botão Adicionar despesa é feita uma requisição a API', async () => {
    jest.spyOn(global, 'fetch');
    renderWithRedux(<Wallet />);
    const buttonEl = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(buttonEl);
    expect(fetch).toHaveBeenCalled();
  });
  test.skip('Ao clicar no botão Adicionar despesa é salva uma nova despesa na chave expenses do estado global', async () => {

  });
  test.skip('Ao clicar no botão Adicionar despesa o valor total do elemento com o data-testid="total-field" é atualizado.', async () => {

  });
  test.skip('Ao clicar no botão Adicionar despesa cada despesa possui um id sequencial.', async () => {

  });
  test.skip('Ao clicar no botão Adicionar despesa os inputs de valor e descrição voltam ao valor inicial, contendo o valor ""', async () => {

  });
  test.skip('Ao clicar no botão Adicionar despesa é exibido o total das despesas com 2 casas decimais no elemento com o data-testid="total-field", levando em consideração a cotação localizada na chave ask.', async () => {

  });
});
