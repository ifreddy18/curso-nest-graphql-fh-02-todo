import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class HelloWorldResolver {
	@Query(() => String, {
		description: `La respuesta es 'Hello world!'`,
		name: 'saludo',
	})
	helloWorld(): string {
		return 'Hello world!'
	}

	@Query(() => Float, {
		name: 'randomNumber',
		// description: 'Get random number from 0 to 100',
	})
	getRandomNumber(): number {
		return Math.random() * 100
	}

	@Query(() => Int, { name: 'randomIntUpToValue' })
	getRandomInt(
		@Args('to', { nullable: true, type: () => Int })
		max: number = 10,
	): number {
		return Math.floor(Math.random() * max + 1)
	}
}
