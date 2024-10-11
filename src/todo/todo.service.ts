import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo } from './entities/todo.entity'
import { CreateTodoInput } from './dtos/inputs/create-todo.input'
import { UpdateTodoInput } from './dtos/inputs/update-todo.input'
import { StatusArgs } from './dtos/args/status.args'

@Injectable()
export class TodoService {
	private todos: Todo[] = [
		{ id: 1, description: 'Docker', done: false },
		{ id: 2, description: 'Nest', done: true },
		{ id: 3, description: 'Next.js', done: false },
		{ id: 4, description: 'Graphql', done: false },
	]

	get totalTodos() {
		return this.todos.length
	}

	get completedTodos() {
		return this.todos.filter(todo => todo.done === true).length
	}

	get pendingTodos() {
		return this.todos.filter(todo => todo.done === false).length
	}

	findAll(statusArgs: StatusArgs): Todo[] {
		const { status } = statusArgs
		if (status !== undefined)
			return this.todos.filter(todo => todo.done === status)

		return this.todos
	}

	findOne(id: number): Todo {
		const todo = this.todos.find(todo => todo.id === id)
		if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)
		return todo
	}

	create(createTodoInput: CreateTodoInput): Todo {
		const todo = new Todo()
		todo.description = createTodoInput.description
		todo.id = Math.max(...this.todos.map(todo => todo.id)) + 1

		this.todos.push(todo)

		return todo
	}

	update(updateTodoInput: UpdateTodoInput) {
		const { id, description, done } = updateTodoInput
		const todoToUpdate = this.findOne(id)

		if (description) todoToUpdate.description = description
		if (done !== undefined) todoToUpdate.done = done

		this.todos = this.todos.map(todo => (todo.id === id ? todoToUpdate : todo))

		return todoToUpdate
	}

	delete(id: number): boolean {
		const todo = this.findOne(id)

		if (!todo) return false

		this.todos = this.todos.filter(todo => todo.id !== id)
		return true
	}
}
