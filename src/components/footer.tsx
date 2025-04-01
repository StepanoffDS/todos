import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Filter, Todo } from '..';

const activatedButtonClasses = 'bg-primary text-primary-foreground';

export const Footer = ({
	todos,
	filter,
	setFilter,
	clearCompleted,
}: {
	todos: Todo[];
	filter: Filter;
	setFilter: (filter: Filter) => void;
	clearCompleted: () => void;
}) => {
	return (
		<div className='flex justify-content-between items-center gap-10 pt-3'>
			<p data-testid='items-left'>
				{todos.filter((item) => !item.completed).length} items left
			</p>
			<div className='flex gap-4'>
				<nav className='flex gap-2'>
					<Button
						variant={'ghost'}
						onClick={() => setFilter('all')}
						className={cn(filter === 'all' && activatedButtonClasses)}
						data-testid='all-filter-button'
					>
						All
					</Button>
					<Button
						variant={'ghost'}
						onClick={() => setFilter('active')}
						className={cn(filter === 'active' && activatedButtonClasses)}
						data-testid='active-filter-button'
					>
						Active
					</Button>
					<Button
						variant={'ghost'}
						onClick={() => setFilter('completed')}
						className={cn(filter === 'completed' && activatedButtonClasses)}
						data-testid='completed-filter-button'
					>
						Completed
					</Button>
				</nav>
				<Button
					variant={'ghost'}
					onClick={clearCompleted}
					data-testid='clear-completed-button'
				>
					Clear completed
				</Button>
			</div>
		</div>
	);
};
