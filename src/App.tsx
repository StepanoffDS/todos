import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { getTodos } from './lib/utils';
import { nanoid } from 'nanoid';
import { Filter, Todo } from '.';
import { TodoList } from './components/todo-list';
import { NoItemsTodo } from './components/no-items-todo';
import { CreatingTodo, Footer } from './components';

function App() {
	const [todos, setTodos] = useState<Todo[]>(getTodos() || []);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState<Filter>('all');

	const createTodo = () => {
		try {
			if (inputValue) {
				localStorage.setItem(
					'todos',
					JSON.stringify([
						...todos,
						{
							id: nanoid(),
							name: inputValue,
							completed: false,
						},
					]),
				);
				setInputValue('');
				setTodos(getTodos());
			}
		} catch (error) {
			console.error(error);
		}
	};

	const toggleTodo = (id: string) => {
		try {
			localStorage.setItem(
				'todos',
				JSON.stringify(
					todos.map((item) => {
						if (item.id === id) {
							item.completed = !item.completed;
						}
						return item;
					}),
				),
			);
			setTodos(getTodos());
		} catch (error) {
			console.error(error);
		}
	};

	const deleteTodo = (id: string) => {
		try {
			localStorage.setItem(
				'todos',
				JSON.stringify(todos.filter((item) => item.id !== id)),
			);
			setTodos(getTodos());
		} catch (error) {
			console.error(error);
		}
	};

	const clearCompleted = () => {
		try {
			localStorage.setItem(
				'todos',
				JSON.stringify(todos.filter((item) => !item.completed)),
			);
			setTodos(getTodos());
		} catch (error) {
			console.error(error);
		}
	};

	const filteredTodos = todos.filter((item) => {
		if (filter === 'active') {
			return !item.completed;
		}
		if (filter === 'completed') {
			return item.completed;
		}
		return item;
	});

	return (
		<div>
			<h1 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
				todos
			</h1>
			<Card>
				<CardContent>
					<CreatingTodo
						createTodo={createTodo}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
					{filteredTodos.length && (
						<TodoList
							filteredTodos={filteredTodos}
							toggleTodo={toggleTodo}
							deleteTodo={deleteTodo}
						/>
					)}
					{!filteredTodos.length && <NoItemsTodo />}
					<Footer
						todos={todos}
						filter={filter}
						setFilter={setFilter}
						clearCompleted={clearCompleted}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
