import { Authors, Author } from "./author"
import { Tags } from "./tag"
import { InternationalConferenceInfo } from "./international_conference_info"
import { InternationalConferenceEvaluation } from "./international_conference_evaluation"
import { Country } from "./country"

export type InternationalConference = {
  id: number
  authors: Authors
  title: string
  international_conference_info: InternationalConferenceInfo
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
	country: Country
  evaluation: InternationalConferenceEvaluation
  peer_review_course: string
  is_manuscript_exist: boolean
  is_slide_pdf_exist: boolean
	is_slide_ppt_exist: boolean
	is_poster_exist: boolean
	is_video_exist: boolean
  tags: Tags
}
export type InternationalConferences = InternationalConference[]

// type for crud
export type InternationalConferenceUpsertValues = Omit<InternationalConference, 'id'>

// type for table display
export type InternationalConferenceTableDisplay = {
	id: number
	authors_name: string
	authors_name_short: string
	title: string
	international_conference_info_name: string
	international_conference_info_name_iso4: string
	international_conference_info_name_short: string
	page: string
	year: number
	url1: string
	url2: string
	doi: string
	is_joint_research: boolean
	venue: string
	city: string
	country_name: string
	evaluation_core_rank: number
	evaluation_qualis: number
	evaluation_rank_guide2research: number
	evaluation_acceptance_rate: number
	peer_review_course: string
	is_manuscript_exist: boolean
  is_slide_pdf_exist: boolean
	is_slide_ppt_exist: boolean
	is_poster_exist: boolean
	is_video_exist: boolean
	tag_names: string
}
export type InternationalConferenceTableDisplays = InternationalConferenceTableDisplay[]

function getAuthorsName(authors: Author[]): string {
	if (!authors) return ''
	return authors.map((author) => `${author.en_first_name} ${author.en_last_name}`).join(', ')
}

function getAuthorsNameShort(authors: Author[]): string {
	if (!authors) return ''
	return authors.map((author) => `${author.en_first_name[0]}. ${author.en_last_name}`).join(', ')
}

export function InternationalConferencesToTableDisplays(international_conferences: InternationalConferences): InternationalConferenceTableDisplays {
	return international_conferences.map((international_conference) => {
		return {
			id: international_conference.id,
			authors_name: getAuthorsName(international_conference.authors),
			authors_name_short: getAuthorsNameShort(international_conference.authors),
			title: international_conference.title,
			international_conference_info_name: international_conference.international_conference_info.name,
			international_conference_info_name_iso4: international_conference.international_conference_info.iso4_name,
			international_conference_info_name_short: international_conference.international_conference_info.short_name,
			start_page: international_conference.start_page,
			end_page: international_conference.end_page,
			page: `pp. ${international_conference.start_page}-${international_conference.end_page}`,
			year: international_conference.year,
			url1: international_conference.url1,
			url2: international_conference.url2,
			doi: international_conference.doi,
			is_joint_research: international_conference.is_joint_research,
			venue: international_conference.venue,
			city: international_conference.city,
			country_name: international_conference.country.name,
			evaluation_core_rank: international_conference.evaluation.core_rank,
			evaluation_qualis: international_conference.evaluation.qualis,
			evaluation_rank_guide2research: international_conference.evaluation.rank_guide2research,
			evaluation_acceptance_rate: international_conference.evaluation.acceptance_rate,
			peer_review_course: international_conference.peer_review_course,
			is_manuscript_exist: international_conference.is_manuscript_exist,
			is_slide_pdf_exist: international_conference.is_slide_pdf_exist,
			is_slide_ppt_exist: international_conference.is_slide_ppt_exist,
			is_poster_exist: international_conference.is_poster_exist,
			is_video_exist: international_conference.is_video_exist,
			tag_names: international_conference.tags.map((tag) => tag.name).join(', ')
		} 
	})
}
