import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class AnswerRequestDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	isAccepted: boolean
}
