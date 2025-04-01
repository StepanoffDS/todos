export interface Todo {
	id: string;
	name: string;
	completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';
