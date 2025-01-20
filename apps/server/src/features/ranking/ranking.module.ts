import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Travel } from '../travels/entities/travel.entity'
import { TravelsModule } from '../travels/travels.module'
import { UsersModule } from '../users/users.module'
import { RankingController } from './ranking.controller'
import { RankingService } from './ranking.service'
import { GoogleMapsDistanceMatrixStrategy } from './strategies/google-maps-distance-matrix-strategy'
import { DistanceMatrixStrategy } from './strategies/types'

const distanceMatrixStrategyProvider: Provider<DistanceMatrixStrategy> = {
	provide: DistanceMatrixStrategy,
	useClass: GoogleMapsDistanceMatrixStrategy
}

@Module({
	imports: [TypeOrmModule.forFeature([Travel]), UsersModule, TravelsModule],
	controllers: [RankingController],
	providers: [RankingService, distanceMatrixStrategyProvider]
})
export class RankingModule {}
