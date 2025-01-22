import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest } from 'fastify'
import { UsersService } from '~/features/users/users.service'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private usersService: UsersService,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPublic) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		const jwtSecret = this.configService.get('JWT_SECRET')

		if (!token) {
			throw new UnauthorizedException()
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtSecret
			})
			const user = await this.usersService.findOne(payload['sub'])

			// 💡 We're assigning the user to the request object here
			// so that we can access it in our route handlers
			request['user'] = user
		} catch (e) {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: FastifyRequest): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
