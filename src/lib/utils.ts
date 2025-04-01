import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Todo } from '..';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getTodos(): Todo[] {
	return localStorage.getItem('todos')
		? JSON.parse(localStorage.getItem('todos') as string)
		: [];
}
