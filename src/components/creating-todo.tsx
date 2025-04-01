import { CheckIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const CreatingTodo = ({
	inputValue,
	setInputValue,
	createTodo,
}: {
	inputValue: string;
	setInputValue: (value: string) => void;
	createTodo: () => void;
}) => {
	return (
		<div className='relative'>
			<Input
				type='text'
				placeholder='What needs to be done?'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && createTodo()}
				data-testid='create-input'
			/>
			<Button
				className='absolute right-0 top-0 bottom-0'
				onClick={createTodo}
				data-testid='create-button'
			>
				<CheckIcon />
			</Button>
		</div>
	);
};
