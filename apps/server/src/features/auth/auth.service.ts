import { randomUUID } from 'node:crypto'
import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
	UnprocessableEntityException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { DateTime } from 'luxon'
import { Repository } from 'typeorm'
import { User } from '~/features/users/entities/user.entity'
import { FileStorageService } from '~/shared/files-upload/file-storage/file-storage.service'
import { RequestSignUpDto } from './dto/request-sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { SignUpRequest } from './entities/sign-up-request.entity'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(SignUpRequest)
		private readonly signUpRequestsRepository: Repository<SignUpRequest>,
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly fileStorageService: FileStorageService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async requestSignUp({ email }: RequestSignUpDto): Promise<string> {
		await this.signUpRequestsRepository.upsert(
			{
				email,
				expirationDate: DateTime.now().plus({ days: 30 })
			},
			{ conflictPaths: ['email'], skipUpdateIfNoValuesChanged: true }
		)
		const signUpRequest = await this.signUpRequestsRepository.findOneBy({
			email
		})

		if (signUpRequest == null) {
			throw new InternalServerErrorException()
		}

		//TODO: send signUpRequest email

		return signUpRequest.id
	}

	async signUp(signUpDto: SignUpDto) {
		const signUpRequest = await this.signUpRequestsRepository.findOneBy({
			id: signUpDto.signUpRequestId
		})

		if (signUpRequest == null) {
			//TODO: Handle this case better
			throw new UnprocessableEntityException(
				'No existe petición de registro para este usuario'
			)
		}

		if (DateTime.now() > signUpRequest.expirationDate) {
			//TODO: Handle this case better
			throw new UnprocessableEntityException(
				'La petición de registro de este usuario venció'
			)
		}

		if (await this.usersRepository.findOneBy({ email: signUpRequest.email })) {
			//TODO: Handle this case better
			throw new ConflictException('Este usuario ya está registrado')
		}

		const HASH_SALT_ROUNDS = 15
		const userEncryptedPassword = await hash(
			signUpDto.password,
			HASH_SALT_ROUNDS
		)

		const profilePicFilename = this.fileStorageService.save(
			signUpDto.profilePic
		)

		await this.usersRepository.save({
			firstName: signUpDto.firstName,
			lastName: signUpDto.lastName,
			email: signUpRequest.email,
			encryptedPassword: userEncryptedPassword,
			gender: signUpDto.gender,
			type: signUpDto.type,
			profilePicFilename: profilePicFilename,
			phoneNumber: signUpDto.phoneNumber,
			emergencyContactPhoneNumber: signUpDto.emergencyContactPhoneNumber
		})

		return 'Usuario registrado con éxito'
	}

	async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
		const user = await this.usersRepository.findOneBy({
			email: signInDto.email
		})

		if (user == null) {
			//TODO: handle this case better
			throw new UnprocessableEntityException(
				'EL USUARIO NO ESTÁ REGISTRADO. no lo aceptes'
			)
		}

		const isRightPassword = await compare(
			signInDto.password,
			user.encryptedPassword
		)

		if (!isRightPassword) {
			//TODO: handle this case better
			throw new UnauthorizedException(
				'LA CONTRASEÑA NO ES. tienes 2 intentos restantes'
			)
		}

		//TODO: move most/all of this to module register and only send sub
		const payload = {
			iss: this.configService.get('JWT_ISSUER'),
			sub: user.id,
			aud: this.configService.get('JWT_AUD'),
			exp: DateTime.now()
				.plus({ days: this.configService.get('JWT_EXP_DAYS', 30) })
				.toSeconds(),
			nbf: DateTime.now()
				.plus({ seconds: this.configService.get('JWT_NBF_SECONDS_OFFSET', 5) })
				.toSeconds(),
			iat: DateTime.now().toSeconds(),
			jti: randomUUID() //TODO: change jti to use something like Cuid2, NanoId, and the likes of them
		}

		return {
			accessToken: await this.jwtService.signAsync(payload)
		}
	}
}