import { Publisher } from "./publisher"

export type InternationalConferenceInfo = {
	id: number
	name: string
	short_name: string
	iso4_name: string
	publisher: Publisher
}

export type InternationalConferenceInfos = InternationalConferenceInfo[]

// type for table display
export type InternationalConferenceInfoTableDisplay = Omit<InternationalConferenceInfo, 'id' | 'publisher'> & { publisher_name: string }
export type InternationalConferenceInfoTableDisplays = InternationalConferenceInfoTableDisplay[]

export function internationalConferencesToTableDisplays(international_conference_infos: InternationalConferenceInfos): InternationalConferenceInfoTableDisplays {
	return international_conference_infos.map((international_conference_info) => {
		return {
			name: international_conference_info.name,
			short_name: international_conference_info.short_name,
			iso4_name: international_conference_info.iso4_name,
			publisher_name: international_conference_info.publisher.name
		} 
	})
}

// type for form
export type InternationalConferenceInfoUpsertValues = Omit<InternationalConferenceInfo, 'id'>