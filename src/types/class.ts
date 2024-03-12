export const CLASSES = [
	'Name',
	'Description',
	'Date',
	'Amount',
	'Supplier',
	'Number',
] as const;

export type TClass = (typeof CLASSES)[number];
