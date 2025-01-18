import { Validators } from '@angular/forms'

export type ValidationErrorMessages = Partial<
	Record<keyof typeof Validators | string, string>
>
