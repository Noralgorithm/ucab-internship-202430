import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateMessageDto {
	@ApiProperty({ example: 'Example' })
	@IsString()
	content: string
}
