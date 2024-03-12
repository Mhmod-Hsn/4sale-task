'use server';

const baseUrl = process.env.currency_exchange_base_url;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
		'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
	},
} as RequestInit;

export const listquotes = async () => {
	const url = `${baseUrl}/listquotes`;
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error('ACTION: listquotes - ERROR:', error);
	}
};

export const exchange = async (from: string, to: string) => {
	const url = `${baseUrl}/exchange?from=${from}&to=${to}`;

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		console.log('ACTION: exchange - RESPONSE:', result);
		return result;
	} catch (error) {
		console.error('ACTION: exchange - ERROR:', error);
	}
};
