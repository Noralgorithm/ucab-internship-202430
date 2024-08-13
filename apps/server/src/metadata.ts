/* eslint-disable */
export default async () => {
	const t = {
		['./shared/constants']: await import('./shared/constants'),
		['./shared/at-dates.entity']: await import('./shared/at-dates.entity')
	}
	return {
		'@nestjs/swagger': {
			models: [
				[
					import('./features/users/dto/create-user.dto'),
					{
						CreateUserDto: {
							id: { required: true, type: () => String },
							firstName: { required: true, type: () => String },
							lastName: { required: true, type: () => String },
							email: { required: true, type: () => String },
							password: { required: true, type: () => String },
							gender: { required: true, enum: t['./shared/constants'].Gender },
							type: { required: true, enum: t['./shared/constants'].UserType },
							walkDistance: { required: true, type: () => Number },
							preferredRole: { required: true, type: () => String },
							profilePic: { required: true, type: () => String },
							phoneNumber: { required: true, type: () => String },
							emergencyContactPhoneNumber: {
								required: true,
								type: () => String
							},
							isDriver: { required: true, type: () => Boolean },
							isActive: { required: true, type: () => Boolean },
							isBlocked: { required: true, type: () => Boolean }
						}
					}
				],
				[import('./features/users/dto/update-user.dto'), { UpdateUserDto: {} }],
				[
					import('./shared/at-dates.entity'),
					{
						AtDates: {
							createdAt: { required: true },
							updatedAt: { required: true }
						}
					}
				],
				[
					import('./features/auth/entities/sign-up-request.entity'),
					{
						SignUpRequest: {
							id: { required: true, type: () => String },
							email: { required: true, type: () => String },
							expirationDate: { required: true },
							atDates: {
								required: true,
								type: () => t['./shared/at-dates.entity'].AtDates
							}
						}
					}
				],
				[
					import('./features/auth/dto/sign-up.dto'),
					{
						SignUpDto: {
							firstName: { required: true, type: () => String },
							lastName: { required: true, type: () => String },
							password: { required: true, type: () => String },
							gender: { required: true, enum: t['./shared/constants'].Gender },
							type: { required: true, enum: t['./shared/constants'].UserType },
							profilePic: { required: true, type: () => String },
							phoneNumber: { required: true, type: () => String },
							emergencyContactPhoneNumber: {
								required: true,
								type: () => String
							},
							signUpRequestId: { required: true, type: () => String }
						}
					}
				],
				[
					import('./features/auth/dto/request-sign-up.dto'),
					{
						RequestSignUpDto: { email: { required: true, type: () => String } }
					}
				],
				[
					import('./features/users/entities/user.entity'),
					{
						User: {
							internalId: { required: true, type: () => Number },
							id: { required: true, type: () => String },
							firstName: { required: true, type: () => String },
							lastName: { required: true, type: () => String },
							email: { required: true, type: () => String },
							encryptedPassword: { required: true, type: () => String },
							gender: { required: true, enum: t['./shared/constants'].Gender },
							type: { required: true, enum: t['./shared/constants'].UserType },
							walkDistance: { required: true, type: () => Number },
							preferredRole: {
								required: true,
								enum: t['./shared/constants'].UserRole
							},
							profilePicUrl: { required: true, type: () => String },
							phoneNumber: { required: true, type: () => String },
							emergencyContactPhoneNumber: {
								required: true,
								type: () => String
							},
							isDriver: { required: true, type: () => Boolean },
							isActive: { required: true, type: () => Boolean },
							isBlocked: { required: true, type: () => Boolean },
							atDates: {
								required: true,
								type: () => t['./shared/at-dates.entity'].AtDates
							}
						}
					}
				],
				[
					import('./features/auth/dto/sign-in.dto'),
					{
						SignInDto: {
							email: { required: true, type: () => String },
							password: { required: true, type: () => String }
						}
					}
				]
			],
			controllers: [
				[
					import('./features/users/users.controller'),
					{
						UsersController: {
							create: { type: String },
							findAll: { type: String },
							findOne: { type: String },
							update: { type: String },
							remove: { type: String }
						}
					}
				],
				[
					import('./features/auth/auth.controller'),
					{
						AuthController: {
							requestSignUp: { type: String },
							signUp: { type: String },
							signIn: {}
						}
					}
				]
			]
		}
	}
}
