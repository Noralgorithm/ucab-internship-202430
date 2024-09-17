import {
	Injectable,
	NestMiddleware,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
		const token = req.headers.authorization?.split('Bearer ')[1]

		if (!token) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('JWT_SECRET')
			})

			if (!payload) {
				throw new UnauthorizedException('Token inválido')
			}

			req['userId'] = payload['sub']
			next()
		} catch (error) {
			throw new UnauthorizedException('Token inválido')
		}
	}
}
