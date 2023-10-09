import { Authors, Author } from "./author"
import { Tags } from "./tag"
import { JournalInfo } from "./journal_info"
import { JournalEvaluation } from "./journal_evaluation"

export type Journal = {
  id: number
  authors: Authors
  title: string
  journal_info: JournalInfo
  year: number
  month: number
	volume: number
	number: number
  start_page: number
  end_page: number
  url1: string
  url2: string
  doi: string
  is_joint_research: boolean
  evaluation: JournalEvaluation
  peer_review_course: string
  is_manuscript_exist: boolean
  is_appendix_exist: boolean
  is_domestic: boolean
  tags: Tags
}
export type Journals = Journal[]

// type for table display
export type JournalTableDisplay = {
	id: number
	authors_name: string
	authors_name_short: string
	title: string
	journal_info_name: string
	journal_info_name_iso4: string
	journal_info_name_short: string
	volume_str: string
	number_str: string
	page: string
	year: number
	url1: string
	url2: string
	doi: string
	is_joint_research: boolean
	evaluation_if: number
	evaluation_acceptance_rate: number
	peer_review_course: string
	is_manuscript_exist: boolean
	is_appendix_exist: boolean
	tag_names: string
}
export type JournalTableDisplays = JournalTableDisplay[]

function getAuthorsName(authors: Author[], is_domestic: boolean): string {
	if (!authors) return ''
	if (is_domestic) return authors.map((author) => `${author.ja_last_name} ${author.ja_first_name}`).join(', ')
	return authors.map((author) => `${author.en_first_name} ${author.en_last_name}`).join(', ')
}

function getAuthorsNameShort(authors: Author[], is_domestic: boolean): string {
	if (!authors) return ''
	if (is_domestic) return authors.map((author) => `${author.ja_last_name} ${author.ja_first_name}`).join(', ')
	return authors.map((author) => `${author.en_first_name[0]}. ${author.en_last_name}`).join(', ')
}

export function JournalsToTableDisplays(journals: Journals): JournalTableDisplays {
	return journals.map((journal) => {
		return {
			id: journal.id,
			authors_name: getAuthorsName(journal.authors, journal.is_domestic),
			authors_name_short: getAuthorsNameShort(journal.authors, journal.is_domestic),
			title: journal.title,
			journal_info_name: journal.journal_info.name,
			journal_info_name_iso4: journal.journal_info.iso4_name,
			journal_info_name_short: journal.journal_info.short_name,
			volume_str: `Vol. ${journal.volume}`,
			number_str: `No. ${journal.number}`,
			start_page: journal.start_page,
			end_page: journal.end_page,
			page: `pp. ${journal.start_page}-${journal.end_page}`,
			year: journal.year,
			url1: journal.url1,
			url2: journal.url2,
			doi: journal.doi,
			is_joint_research: journal.is_joint_research,
			evaluation_if: journal.evaluation.if,
			evaluation_acceptance_rate: journal.evaluation.acceptance_rate,
			peer_review_course: journal.peer_review_course,
			is_manuscript_exist: journal.is_manuscript_exist,
			is_appendix_exist: journal.is_appendix_exist,
			tag_names: journal.tags.map((tag) => tag.name).join(', ')
		} 
	})
}
