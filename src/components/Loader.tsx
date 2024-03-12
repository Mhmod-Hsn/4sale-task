import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {};

export const LoaderContent = (props: Props) => {
	return (
		<div
			className='
	absolute inset-0 
	flex items-center justify-center
	bg-primary-foreground/75
	'
		>
			<Loader className='w-6 h-6' />
		</div>
	);
};

export const Loader = ({ className }: { className?: string }) => {
	return <ReloadIcon className={`h-4 w-4 animate-spin ${className}`} />;
};
