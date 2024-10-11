import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const logger = new Logger('bootstrap')
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('nest-graphql/todo')
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)

	const port = 3000
	logger.log(`Live in port ${port}`)
	await app.listen(port)
}
bootstrap()
