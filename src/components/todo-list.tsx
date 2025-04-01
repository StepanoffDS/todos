import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Todo } from '..';
import { cn } from '@/lib/utils';

export const TodoList = ({
	filteredTodos,
	toggleTodo,
	deleteTodo,
}: {
	filteredTodos: Todo[];
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
}) => {
	return (
		<ul className='mt-4 flex flex-col gap-2'>
			{filteredTodos.map((item) => (
				<li
					key={item.id}
					className={cn(
						'flex items-center justify-between gap-4 border-b border-b-gray-200/50',
						item.completed && 'line-through opacity-50',
					)}
					data-testid='todo-item'
				>
					<Label htmlFor={item.id} className='flex-1 py-3 cursor-pointer'>
						<Checkbox
							id={item.id}
							className='mr-2 w-6 h-6'
							onClick={() => toggleTodo(item.id)}
							checked={item.completed}
							data-testid='todo-checkbox'
						/>
						<div>{item.name}</div>
					</Label>
					<Button
						variant={'ghost'}
						className='cursor-pointer'
						onClick={() => deleteTodo(item.id)}
						data-testid='delete-button'
					>
						<Trash2 size={10} />
					</Button>
				</li>
			))}
		</ul>
	);
};
