import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entities/todo.entity'
import { TodoService } from './todo.service'
import { CreateTodoInput } from './dtos/inputs/create-todo.input'
import { UpdateTodoInput } from './dtos/inputs/update-todo.input'
import { StatusArgs } from './dtos/args/status.args'
import { AggregationsType } from './types/aggregations.type'

@Resolver(() => Todo)
export class TodoResolver {
	constructor(private readonly todoService: TodoService) {}

	@Query(() => [Todo], { name: 'todos' })
	findAll(@Args() statusArgs: StatusArgs): Todo[] {
		return this.todoService.findAll(statusArgs)
	}

	@Query(() => Todo, { name: 'todo' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.todoService.findOne(id)
	}

	@Mutation(() => Todo, { name: 'createTodo' })
	createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
		return this.todoService.create(createTodoInput)
	}

	@Mutation(() => Todo, { name: 'updateTodo' })
	updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
		return this.todoService.update(updateTodoInput)
	}

	@Mutation(() => Boolean, { name: 'removeTodo' })
	removeTodo(@Args('id', { type: () => Int }) id: number) {
		return this.todoService.delete(id)
	}

	// Agregations - Alternative 1
	@Query(() => Int, { name: 'totalTodos' })
	totalTodos(): number {
		return this.todoService.totalTodos
	}

	@Query(() => Int, { name: 'completedTodos' })
	completedTodos(): number {
		return this.todoService.completedTodos
	}

	@Query(() => Int, { name: 'pendingTodos' })
	pendingTodos(): number {
		return this.todoService.pendingTodos
	}

	// Agregations - Alternative 2
	@Query(() => AggregationsType)
	aggregations(): AggregationsType {
		return {
			completed: this.todoService.completedTodos,
			pending: this.todoService.pendingTodos,
			total: this.todoService.totalTodos,
		}
	}
}
