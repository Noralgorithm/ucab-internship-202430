import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ride } from '../rides/entities/ride.entity'
import { Travel } from '../travels/entities/travel.entity'
import { UsersModule } from '../users/users.module'
import { TravelDistanceMatrixPerPassenger } from './entities/travel-distance-matrix-per-passenger.entity'
import { RankingController } from './ranking.controller'
import { RankingService } from './ranking.service'
import { GoogleMapsDistanceMatrixStrategy } from './strategies/google-maps-distance-matrix-strategy'
import { DistanceMatrixStrategy } from './strategies/types'

const distanceMatrixStrategyProvider: Provider<DistanceMatrixStrategy> = {
	provide: DistanceMatrixStrategy,
	useClass: GoogleMapsDistanceMatrixStrategy
}

@Module({
	imports: [
		TypeOrmModule.forFeature([Travel, Ride, TravelDistanceMatrixPerPassenger]),
		UsersModule
	],
	controllers: [RankingController],
	providers: [RankingService, distanceMatrixStrategyProvider],
	exports: [distanceMatrixStrategyProvider]
})
export class RankingModule {}
