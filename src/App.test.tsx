import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('create todo with create button', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		expect(screen.getByText('Test todo')).toBeInTheDocument();
		expect(localStorage.getItem('todos')).toContain('Test todo');
	});

	test('create todo with enter key', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.keyDown(inputElement, { key: 'Enter' });

		expect(screen.getByText('Test todo')).toBeInTheDocument();
		expect(localStorage.getItem('todos')).toContain('Test todo');
	});

	test('toggle todo', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		const todoElement = screen.getByTestId('todo-item');
		expect(todoElement).toBeInTheDocument();

		const toggleButton = screen.getByTestId('todo-checkbox');

		fireEvent.click(toggleButton);
		expect(todoElement).toHaveClass('line-through');

		fireEvent.click(toggleButton);
		expect(todoElement).not.toHaveClass('line-through');
	});

	test('delete todo', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		const todoElement = screen.getByTestId('todo-item');
		expect(todoElement).toBeInTheDocument();

		const deleteButton = screen.getByTestId('delete-button');

		fireEvent.click(deleteButton);
		expect(todoElement).not.toBeInTheDocument();
	});

	test('how much items left', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		const todoElement = screen.getByTestId('todo-item');
		expect(todoElement).toBeInTheDocument();

		const itemsLeft = screen.getByTestId('items-left');

		expect(itemsLeft).toHaveTextContent('1');
	});

	test('clear completed', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		const todoElement = screen.getByTestId('todo-item');
		expect(todoElement).toBeInTheDocument();

		const toggleButton = screen.getByTestId('todo-checkbox');

		fireEvent.click(toggleButton);
		expect(todoElement).toHaveClass('line-through');

		const clearButton = screen.getByTestId('clear-completed-button');

		fireEvent.click(clearButton);
		expect(todoElement).not.toBeInTheDocument();
	});

	test('filter todos', () => {
		render(<App />);

		const inputElement = screen.getByTestId('create-input');
		const createButton = screen.getByTestId('create-button');

		fireEvent.change(inputElement, { target: { value: 'Test todo' } });
		fireEvent.click(createButton);

		const todoElement = screen.getByTestId('todo-item');
		expect(todoElement).toBeInTheDocument();

		const allFilter = screen.getByTestId('all-filter-button');
		const activeFilter = screen.getByTestId('active-filter-button');
		const completedFilter = screen.getByTestId('completed-filter-button');

		fireEvent.click(allFilter);
		expect(todoElement).toBeInTheDocument();

		fireEvent.click(activeFilter);
		expect(todoElement).toBeInTheDocument();

		fireEvent.click(completedFilter);
		expect(todoElement).not.toBeInTheDocument();

		fireEvent.click(allFilter);
	});
});
