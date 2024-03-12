'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SwapIcon } from './SwapIcon';

const formSchema = z.object({
	amount: z.string().min(0.1, {
		message: 'Amount must be greater than 0',
	}),
});

export const MoneyExchangeForm = ({ currencies }: { currencies: string[] }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '0.0',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex gap-4 align-middle'>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem className='flex-grow'>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input placeholder='0.0' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem className='flex-grow'>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input placeholder='0.0' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='button'
						variant='outline'
						size='icon'
						className='rounded-full mt-8'
					>
						<span className='opacity-35'>
							<SwapIcon />
						</span>
					</Button>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem className='flex-grow'>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input placeholder='0.0' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type='button'
					// onClick={() => form.reset()}
					className='rounded-full px-8'
				>
					Reset
				</Button>
				{/* <p>{`${amount} ${from} equals ${exchangedAmount} ${to}`}</p> */}
			</form>
		</Form>
	);
};
