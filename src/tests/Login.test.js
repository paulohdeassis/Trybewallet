import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';

import App from '../App';

describe('Realiza os testes para a página de login', () => {
  test('Verifica se o a tela de login habilita o botão de salvar apenas depois de receber um email e senha corretos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByRole('button', { name: /Entrar/i });

    const validPassword = '123456';
    const invalidPassword = '12345';
    const validMail = 'paulo.henrique.hunter@gmail.com';
    const invalidMail = 'paulo.henrique.hunter.gmail.com';

    userEvent.type(emailInput, invalidMail);
    userEvent.type(passwordInput, invalidPassword);

    expect(submitBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, validMail);
    userEvent.type(passwordInput, invalidPassword);

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, validMail);
    userEvent.type(passwordInput, validPassword);

    expect(submitBtn).not.toBeDisabled();
  });

  test('testa se ao clicar no botão quando habilitado a função leva para página de gastos', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByRole('button', { name: /Entrar/i });

    const validPassword = '123456';
    const validMail = 'paulo.henrique.hunter@gmail.com';

    userEvent.type(emailInput, validMail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(submitBtn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
