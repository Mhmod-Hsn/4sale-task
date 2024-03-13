'use client';
import { exchange } from '@/actions/currencyExhange';
import { LoaderContent } from '@/components/Loader';
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
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SwapIcon } from './SwapIcon';

const formSchema = z.object({
	amount: z.string(),
	from: z.string(),
	to: z.string(),
});

export const MoneyExchangeForm = ({ currencies }: { currencies: string[] }) => {
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [timeoutId, setTimeoutId] = useState<ReturnType<
		typeof setTimeout
	> | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '1.0',
			from: '',
			to: '',
		},
	});
	const showResetButton =
		form.getValues('from') && form.getValues('to') && form.getValues('amount');

	const prepareResponse = (
		amount: string,
		exchangeRate: string,
		from: string,
		to: string
	) => {
		return `${amount} ${from} equals ${
			Number(exchangeRate) * Number(amount)
		} ${to}`;
	};

	const swapCurrencies = () => {
		const from = form.getValues('from');
		const to = form.getValues('to');

		// as both values can't be the same
		form.setValue('from', '');
		form.setValue('to', '');

		form.setValue('from', to);
		form.setValue('to', from);
	};

	const handleSubmit = useCallback(
		async (values: z.infer<typeof formSchema>) => {
			if (!values.amount || !values.from || !values.to) return;

			setIsLoading(true);
			setMessage(null);
			const res = await exchange(values.from, values.to);
			setIsLoading(false);
			if (!res) return;
			setMessage(prepareResponse(values.amount, res, values.from, values.to));
		},
		[]
	);

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			// clear previous timeout
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// to debounce inputs a little
			const id = setTimeout(() => {
				handleSubmit(values);
			}, 1000);

			setTimeoutId(id);
		},
		[handleSubmit, timeoutId]
	);

	// trigger onChange
	useEffect(() => {
		const subscription = form.watch(form.handleSubmit(onSubmit) as any);
		return () => subscription.unsubscribe();
	}, [form, onSubmit]);

	return (
		<>
			{isLoading && <LoaderContent />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<div className='flex flex-col md:flex-row gap-4'>
						<FormField
							control={form.control}
							name='amount'
							render={({ field }) => (
								<FormItem className='flex-1 '>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											type='number'
											placeholder='0.0'
											{...field}
										/>
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
												<SelectValue placeholder='Currency' />
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
							<span className='text-primary'>
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
												<SelectValue placeholder='Currency' />
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
					{showResetButton && (
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
					)}
					{<p>{message}</p>}
				</form>
			</Form>
		</>
	);
};
