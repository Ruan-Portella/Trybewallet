import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_INPUT = 'email-input';
const PASSOWORD_INPUT = 'password-input';

describe('Testa a Pagina Login', () => {
  test('A rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('É renderizado um elemento para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<Login />);
    const InputName = screen.getByTestId(EMAIL_INPUT);
    expect(InputName).toBeInTheDocument();

    const InputEmail = screen.getByTestId(PASSOWORD_INPUT);
    expect(InputEmail).toBeInTheDocument();
  });

  test('É renderizado um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<Login />);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttonEl).toBeInTheDocument();
  });

  test('Foram realizadas as seguintes verificações nos campos de email, senha e botão:', () => {
    renderWithRouterAndRedux(<Login />);
    const InputName = screen.getByTestId(EMAIL_INPUT);

    const InputEmail = screen.getByTestId(PASSOWORD_INPUT);

    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttonEl).toBeInTheDocument();

    userEvent.type(InputName, 'ruan@ruangmail.com');
    userEvent.type(InputEmail, '123456');

    expect(buttonEl).not.toBeDisabled();
    userEvent.clear(InputName);
    userEvent.clear(InputEmail);

    userEvent.type(InputName, '');
    userEvent.type(InputEmail, '');

    expect(buttonEl).toBeDisabled();
  });
});
