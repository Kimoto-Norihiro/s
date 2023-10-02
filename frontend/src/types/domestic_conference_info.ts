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
export type DomesticConferenceInfoTableDisplay = Omit<DomesticConferenceInfo, 'id' | 'publisher'> & { publisher_name: string }
export type DomesticConferenceInfoTableDisplays = DomesticConferenceInfoTableDisplay[]

export function domesticConferencesToTableDisplays(domestic_conference_infos: DomesticConferenceInfos): DomesticConferenceInfoTableDisplays {
	return domestic_conference_infos.map((domestic_conference_info) => {
		return {
			name: domestic_conference_info.name,
			short_name: domestic_conference_info.short_name,
			other_name: domestic_conference_info.other_name,
			collection_notation: domestic_conference_info.collection_notation,
			publisher_name: domestic_conference_info.publisher.name
		} 
	})
}

// type for form
export type DomesticConferenceInfoUpsertValues = Omit<DomesticConferenceInfo, 'id'>