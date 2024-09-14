import { ColorInfo } from '~/shared/types/vehicles/color-info.type'
import { Color } from '~/shared/types/vehicles/color.type'

export const colors: Record<Color, ColorInfo> = {
	black: {
		value: '#121111',
		label: 'Negro'
	},
	white: {
		value: '#eceaea',
		label: 'Blanco'
	},
	blue: {
		value: '#3c3cd7',
		label: 'Azul'
	},
	gray: {
		value: '#808080',
		label: 'Gris'
	},
	silver: {
		value: '#c8c4c4',
		label: 'Plateado'
	},
	red: {
		value: '#da2a2a',
		label: 'Rojo'
	},
	green: {
		value: '#278B27',
		label: 'Verde'
	},
	yellow: {
		value: '#dede18',
		label: 'Amarillo'
	},
	purple: {
		value: '#7d2181',
		label: 'Morado'
	},
	pink: {
		value: '#ff84f3',
		label: 'Rosado'
	},
	orange: {
		value: '#ff8726',
		label: 'Naranja'
	}
}
