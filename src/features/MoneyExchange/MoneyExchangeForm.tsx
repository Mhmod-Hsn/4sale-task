'use client';

import { exchange } from '@/actions/currencyExhange';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SwapIcon } from './SwapIcon';

const formSchema = z.object({
	amount: z.string().min(0.1, {
		message: 'Amount must be greater than 0',
	}),
	from: z.string(),
	to: z.string(),
});

export const MoneyExchangeForm = ({ currencies }: { currencies: string[] }) => {
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '0.0',
			from: '',
			to: '',
		},
	});

	const prepareResponse = (amount: string, exchangedAmount: string, from: string, to: string) => {
		return `${amount} ${from} equals ${exchangedAmount} ${to}`;
	};

	const swapCurrencies = () => {
		const [from, to] = [form.getValues().from, form.getValues().to];
		form.setValue('from', to);
		form.setValue('to', from);
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		setMessage(null);

		if (
			!values.amount ||
			!values.from ||
			!values.to ||
			isNaN(parseFloat(values.amount))
		)
			return;

		const res = await exchange(
			values.from,
			values.to,
			parseFloat(values.amount)
		);

		setMessage(prepareResponse(values.amount, res, values.from, values.to));
	}

	useEffect(() => {
		const subscription = form.watch(form.handleSubmit(onSubmit) as any);
		return () => subscription.unsubscribe();
	}, [form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex flex-col md:flex-row gap-4 	 '>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem className='flex-1 '>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input type='number' placeholder='0.0' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='from'
						render={({ field }) => (
							<FormItem className='flex-1 '>
								<FormLabel>From</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a currency' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{currencies.map((currency) => (
											<SelectItem
												key={currency}
												value={currency}
												disabled={currency === form.getValues('to')}
											>
												{currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='button'
						variant='outline'
						size='icon'
						className='rounded-full mt-8 flex-none mx-auto'
						onClick={swapCurrencies}
					>
						<span className='opacity-35'>
							<SwapIcon />
						</span>
					</Button>
					<FormField
						control={form.control}
						name='to'
						render={({ field }) => (
							<FormItem className='flex-1 '>
								<FormLabel>To</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a currency' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{currencies.map((currency) => (
											<SelectItem
												key={currency}
												value={currency}
												disabled={currency === form.getValues('from')}
											>
												{currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type='button'
					onClick={() => {
						form.reset();
						setMessage(null);
					}}
					className='rounded-full px-8'
				>
					Reset
				</Button>
				{<p>{message}</p>}
			</form>
		</Form>
	);
};
