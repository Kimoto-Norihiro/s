import { Authors, Author } from "./author"
import { Tags } from "./tag"
import { DomesticConferenceInfo } from "./domestic_conference_info"

export type DomesticConference = {
  id: number
  authors: Authors
  title: string
  domestic_conference_info: DomesticConferenceInfo
  year: number
  month: number
  start_page: number
  end_page: number
  url1: string
  url2: string
  doi: string
  is_joint_research: boolean
	venue: string
	city: string
  peer_review_course: string
  is_manuscript_exist: boolean
  is_slide_pdf_exist: boolean
	is_slide_ppt_exist: boolean
	is_poster_exist: boolean
	is_video_exist: boolean
  tags: Tags
}
export type DomesticConferences = DomesticConference[]

// type for crud
export type DomesticConferenceUpsertValues = Omit<DomesticConference, 'id'>

// type for table display
export type DomesticConferenceTableDisplay = {
	id: number
	authors_name: string
	authors_name_short: string
	title: string
	domestic_conference_info_name: string
	domestic_conference_info_name_other: string
	domestic_conference_info_name_short: string
	page: string
	year: number
	url1: string
	url2: string
	doi: string
	is_joint_research: boolean
	venue: string
	city: string
	peer_review_course: string
	is_manuscript_exist: boolean
  is_slide_pdf_exist: boolean
	is_slide_ppt_exist: boolean
	is_poster_exist: boolean
	is_video_exist: boolean
	tag_names: string
}
export type DomesticConferenceTableDisplays = DomesticConferenceTableDisplay[]

function getAuthorsName(authors: Author[]): string {
	if (!authors) return ''
	return authors.map((author) => `${author.en_first_name} ${author.en_last_name}`).join(', ')
}

function getAuthorsNameShort(authors: Author[]): string {
	if (!authors) return ''
	return authors.map((author) => `${author.en_first_name[0]}. ${author.en_last_name}`).join(', ')
}

export function DomesticConferencesToTableDisplays(domestic_conferences: DomesticConferences): DomesticConferenceTableDisplays {
	return domestic_conferences.map((domestic_conference) => {
		return {
			id: domestic_conference.id,
			authors_name: getAuthorsName(domestic_conference.authors),
			authors_name_short: getAuthorsNameShort(domestic_conference.authors),
			title: domestic_conference.title,
			domestic_conference_info_name: domestic_conference.domestic_conference_info.name,
			domestic_conference_info_name_other: domestic_conference.domestic_conference_info.other_name,
			domestic_conference_info_name_short: domestic_conference.domestic_conference_info.short_name,
			page: `pp. ${domestic_conference.start_page}-${domestic_conference.end_page}`,
			year: domestic_conference.year,
			url1: domestic_conference.url1,
			url2: domestic_conference.url2,
			doi: domestic_conference.doi,
			is_joint_research: domestic_conference.is_joint_research,
			venue: domestic_conference.venue,
			city: domestic_conference.city,
			peer_review_course: domestic_conference.peer_review_course,
			is_manuscript_exist: domestic_conference.is_manuscript_exist,
			is_slide_pdf_exist: domestic_conference.is_slide_pdf_exist,
			is_slide_ppt_exist: domestic_conference.is_slide_ppt_exist,
			is_poster_exist: domestic_conference.is_poster_exist,
			is_video_exist: domestic_conference.is_video_exist,
			tag_names: domestic_conference.tags.map((tag) => tag.name).join(', ')
		} 
	})
}
