import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa o component Header', () => {
  test('O elemento com o data-testid="email-field" renderiza o email salvo no estado global.', async () => {
    const initialState = {
      user: {
        email: 'ruan@ruan.com',
      },
    };

    const { store } = renderWithRedux(<Wallet />, { initialState });

    const InputEmail = await screen.findByTestId('email-field');
    expect(InputEmail.innerHTML).toBe(store.getState().user.email);
  });

  test('O elemento com o data-testid="total-field" inicialmente renderiza o valor 0.', async () => {
    renderWithRedux(<Wallet />);

    const InputEmail = await screen.findByTestId('total-field');
    expect(InputEmail.innerHTML).toBe('0.00');
  });
  test('O elemento com o data-testid="header-currency-field renderiza o texto BRL.', async () => {
    renderWithRedux(<Wallet />);

    const InputEmail = await screen.findByTestId('header-currency-field');
    expect(InputEmail.textContent).toBe('BRL');
  });
});
