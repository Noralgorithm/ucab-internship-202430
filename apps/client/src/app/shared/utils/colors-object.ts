import { ColorInfo } from '../types/vehicles/color-info.type'
import { Color } from '../types/vehicles/color.type'

export const colors: Record<Color, ColorInfo> = {
	black: {
		value: '#000000',
		label: 'Negro'
	},
	white: {
		value: '#ffffff',
		label: 'Blanco'
	},
	blue: {
		value: '#0000ff',
		label: 'Azúl'
	},
	gray: {
		value: '#808080',
		label: 'Gris'
	},
	silver: {
		value: '#bebebe',
		label: 'Plateado'
	},
	red: {
		value: '#ff0000',
		label: 'Rojo'
	},
	green: {
		value: '#008000',
		label: 'Verde'
	},
	yellow: {
		value: 'ffff00',
		label: 'Amarillo'
	},
	purple: {
		value: '#7d2181',
		label: 'Morado'
	},
	pink: {
		value: '#ffc1bc',
		label: 'Rosado'
	},
	orange: {
		value: '#ff8726',
		label: 'Naranja'
	}
}
