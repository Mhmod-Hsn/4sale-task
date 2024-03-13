import { listquotes } from '@/actions/currencyExhange';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { MoneyExchangeForm } from '@/features/MoneyExchange/MoneyExchangeForm';
import Image from 'next/image';

export default async function Home() {
	const currencies = await listquotes();

	return (
		<main className='relative min-h-[100dvh] w-full bg-center bg-cover '>
			<div className='absolute inset-0'>
				<Image
					src='/BG.jpg'
					width={1920}
					height={1080}
					alt='Background'
					className='absolute object-cover h-full w-full'
				/>
				<div className='absolute inset-0 bg-primary/75 ' />
			</div>

			<div className='container relative'>
				<div className='pt-28'>
					<h1 className='text-center font-bold text-3xl md:text-5xl'>
						Money Exchange
					</h1>

					<Card className='mt-10'>
						<CardContent className='py-20 px-16 relative '>
							<MoneyExchangeForm currencies={currencies || []} />
						</CardContent>
					</Card>
				</div>
			</div>

			<span className='absolute bottom-4 right-4 text-primary'>
				<ThemeToggle />
			</span>
		</main>
	);
}
