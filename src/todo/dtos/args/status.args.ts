import { ArgsType, Field } from '@nestjs/graphql'
import { IsBoolean, IsOptional } from 'class-validator'

@ArgsType()
export class StatusArgs {
	@Field(() => Boolean, { nullable: true, description: 'Todos done status' })
	@IsBoolean()
	@IsOptional()
	status?: boolean

	@Field(() => Boolean, { nullable: true, description: 'Todos done status' })
	@IsBoolean()
	@IsOptional()
	test?: boolean
}
