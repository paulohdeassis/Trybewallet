import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import globalState from './helpers/globalStateMock';
import App from '../App';

describe('Realiza testes da página Wallet e do componente WalletForm', () => {
  test('Testa se é possível adicionar uma despesa corretamente', async () => {
    const { history } = renderWith(<App />, { initialEntries: ['/carteira'], inicialState: globalState });

    expect(history.location.pathname).toBe('/carteira');
    const sumOfExpenses = screen.getByTestId('total-field');
    const mailField = screen.getByTestId('email-field');

    expect(sumOfExpenses).toBeInTheDocument();
    expect(mailField).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();

    userEvent.type(valueInput, '10,00');
    userEvent.type(descriptionInput, 'Despesa de teste');
    userEvent.click(addExpenseBtn);

    const description = await waitFor(() => screen.getByText('Despesa de teste'));

    expect(description).toBeInTheDocument();

    /* const teste = screen.queryByRole('Test expense');

    expect(sumOfExpenses.textContent).toBe('0.00');
    expect(mailField.textContent).toBe(globalState.user.email);
    expect(editBtn).toBeInTheDocument();
    userEvent.type(valueInput, '10,00');
    userEvent.type(descriptionInput, 'Despesa de teste');
    userEvent.click(addExpenseBtn);
    const expenseDescription = screen.getByTestId('expense-value-0');
    console.log(expenseDescription); */
  });

  test('Verifica se é possível editar uma despesa', async () => {
    renderWith(<App />, { initialEntries: ['/carteira'], inicialState: globalState });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const AddEditBtn = screen.getByTestId('add-edit-btn');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Despesa de teste');
    userEvent.click(AddEditBtn);

    const editBtn = await waitFor(() => screen.getByTestId('edit-btn'));
    const removeBtn = await waitFor(() => screen.getByTestId('delete-btn'));
    const valueTxt = await waitFor(() => screen.getByTestId('expense-value-0'));

    console.log(valueTxt.textContent);
    expect(valueTxt.textContent).toBe('0.00');

    userEvent.click(editBtn);
    userEvent.type(valueInput, '100');
    userEvent.click(AddEditBtn);
  });
});
