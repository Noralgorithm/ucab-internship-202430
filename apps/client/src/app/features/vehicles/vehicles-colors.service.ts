import { Injectable } from '@angular/core'
import { SelectOption } from '~/shared/types/select-option.type'
import { Color } from '~/shared/types/vehicles/color.type'
import { VEHICLES_COLORS, VEHICLES_COLORS_LABELS } from './vehicles-colors'

@Injectable({
	providedIn: 'root'
})
export class VehiclesColorsService {
	getColors() {
		return VEHICLES_COLORS
	}

	getAllLabels() {
		return VEHICLES_COLORS_LABELS
	}

	getLabelByHex(hex: string) {
		const colorKey = Object.keys(VEHICLES_COLORS).filter(
			(key) => VEHICLES_COLORS[key as Color] === hex
		)?.[1] as Color

		if (!colorKey) {
			return undefined
		}

		return VEHICLES_COLORS[colorKey]
	}

	getLabel(color: Color) {
		return VEHICLES_COLORS_LABELS[color]
	}

	getColorsOptions(): SelectOption[] {
		return Object.entries(VEHICLES_COLORS).map(([key, hex]) => ({
			label: VEHICLES_COLORS_LABELS[key as Color],
			value: hex
		}))
	}
}
