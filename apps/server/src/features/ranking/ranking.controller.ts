import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { RankDto } from './dto/rank.dto'
import { RankingService } from './ranking.service'

@ApiTags('[WIP] ranking')
@Controller('ranking')
export class RankingController {
	constructor(private readonly rankingService: RankingService) {}

	@Post('rank')
	rank(@Body() rankDto: RankDto, @CurrentUser() currentUser: User) {
		return this.rankingService.rank({
			routeType: rankDto.routeType,
			womenOnly: rankDto.womenOnly,
			passenger: {
				id: currentUser.id,
				location: rankDto.passengerLocation
			}
		})
	}
}
