import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MoneyExchangeForm } from './MoneyExchangeForm';

const currencies = ['currency1', 'currency2', 'currency3'];

describe('Money Exchange', () => {
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	it('Render 2 currencies dropdowns', () => {
		render(<MoneyExchangeForm currencies={currencies} />);
		expect(screen.getAllByRole('combobox')).toHaveLength(2);
	});

	it('Amount input has correct value', async () => {
		render(<MoneyExchangeForm currencies={currencies} />);
		const inputElement = screen.getAllByTestId('amount')[0] as HTMLInputElement;

		// having 1.0 as default
		expect(inputElement.value).toBe('1.0');

		fireEvent.change(inputElement, { target: { value: '100' } });
		expect(inputElement.value).toBe('100');
	});

	it('Options is correctly', async () => {
		const container = render(<MoneyExchangeForm currencies={currencies} />);
		const options = container.baseElement.querySelectorAll('option');
		expect(options.length).toBe(currencies.length * 2);
	});

	it('Select currency', async () => {
		const user = userEvent.setup();
		const container = render(<MoneyExchangeForm currencies={currencies} />);
		const select = container.baseElement.querySelectorAll('select')[0];
		await user.selectOptions(select, currencies[0]);
		expect(
			(
				select.querySelector(
					`option[value="${currencies[0]}"]`
				) as HTMLOptionElement
			).selected
		).toBe(true);
	});

	it('Swap', async () => {
		const user = userEvent.setup();
		const { baseElement, getByTestId } = render(
			<MoneyExchangeForm currencies={currencies} />
		);
		const selectFrom = baseElement.querySelectorAll('select')[0];
		const selectTo = baseElement.querySelectorAll('select')[1];

		await user.selectOptions(selectFrom, currencies[0]);
		await user.selectOptions(selectTo, currencies[1]);

		// swap button
		const swapButton = screen.getByTestId('swap') as HTMLButtonElement;

		fireEvent(
			swapButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(
			(
				selectFrom.querySelector(
					`option[value="${currencies[0]}"]`
				) as HTMLOptionElement
			).selected
		).toBe(true);
		expect(
			(
				selectTo.querySelector(
					`option[value="${currencies[1]}"]`
				) as HTMLOptionElement
			).selected
		).toBe(true);
	});
});
