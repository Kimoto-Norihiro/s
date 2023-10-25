import exp from "constants"
import { Publisher } from "./publisher"

export type DomesticConferenceInfo = {
	id: number
	name: string
	short_name: string
	other_name: string
	collection_notation: string
	publisher: Publisher
}

export type DomesticConferenceInfos = DomesticConferenceInfo[]

// type for table display
export type DomesticConferenceInfoTableDisplay = Omit<DomesticConferenceInfo, 'publisher'> & { publisher_name: string }
export type DomesticConferenceInfoTableDisplays = DomesticConferenceInfoTableDisplay[]

export function domesticConferencesToTableDisplays(domestic_conference_infos: DomesticConferenceInfos): DomesticConferenceInfoTableDisplays {
	return domestic_conference_infos.map((domestic_conference_info) => {
		return {
			id: domestic_conference_info.id,
			name: domestic_conference_info.name,
			short_name: domestic_conference_info.short_name,
			other_name: domestic_conference_info.other_name,
			collection_notation: domestic_conference_info.collection_notation,
			publisher_name: domestic_conference_info.publisher.name
		} 
	})
}

export const domesticConferenceInfosToOptions = (list: DomesticConferenceInfos) => {
	return list.map((domestic_conference_info) => {
		return {
			value: domestic_conference_info,
			label: domestic_conference_info.name
		} 
	}) 
}

// type for form
export type DomesticConferenceInfoUpsertValues = Omit<DomesticConferenceInfo, 'id'>