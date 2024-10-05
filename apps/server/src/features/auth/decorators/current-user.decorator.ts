import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from '~/features/users/entities/user.entity'

export const CurrentUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request['user'] as User | undefined

		return data ? user?.[data] : user
	}
)
