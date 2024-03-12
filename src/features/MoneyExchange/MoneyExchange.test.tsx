import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MoneyExchangeForm } from './MoneyExchangeForm';

const currencies = ['currency1', 'currency2', 'currency3'];

test('Money Exchange: Render currencies dropdowns correctly', () => {
	render(<MoneyExchangeForm currencies={currencies} />);
	expect(screen.getAllByRole('combobox')).toHaveLength(2);
});
