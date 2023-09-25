import { Tags } from "./tag"

export type PaperKind = {
  id: number
  name: string
}

export type Author = {
  id: number
  ja_first_name: string
  ja_last_name: string
  en_first_name: string
  en_last_name: string
}
export type Authors = Author[]

export type ConferenceAndJournal = {
  id: number
  name: string
  short_name: string
  iso4_name: string
  paper_kind: PaperKind
  publisher: Publisher
}
export type ConferenceAndJournals = ConferenceAndJournal[]

export type Publisher = {
  id: number
  name: string
  short_name: string
}
export type Publishers = Publisher[]

export type Paper = {
  id: number
  paper_kind: PaperKind
  authors: Authors
  title: string
  url: string
  conference_and_journal: ConferenceAndJournal
  start_page: number
  end_page: number
  year: number
  month: number
  pdf_path: string
}
export type Papers = Paper[]

export type Journal = {
  id: number
  authors: Authors
  title: string
  journal_info: JournalInfo
  year: number
  month: number
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

export type JournalInfo = {
  id: number
  name: string
  short_name: string
  iso4_name: string
  publisher: Publisher
}

export type JournalEvaluation = {
  journal_info_id: number
  year: number
  if: number
  acceptance_rate: number
  number_of_submitted_papers: number
  number_of_accepted_papers: number
}
// type of table
export type AuthorTableDisplay = {
	ja_name: string
	en_name: string
}
export type AuthorTableDisplays = AuthorTableDisplay[]

export function authorsToTableDisplays(authors: Authors): AuthorTableDisplays {
  return authors.map((author) => {
    return {
      ja_name: `${author.ja_last_name} ${author.ja_first_name}`,
      en_name: `${author.en_first_name} ${author.en_last_name}`
    }
  })
}

export type PublisherTableDisplay = Omit<Publisher, 'id'>
export type PublisherTableDisplays = PublisherTableDisplay[]

export function publishersToTableDisplays(publishers: Publishers): PublisherTableDisplays {
  return publishers.map((publisher) => {
    return {
      name: publisher.name,
      short_name: publisher.short_name
    }
  })
}

export type ConferenceAndJournalTableDisplay = {
  name: string
  short_name: string
  iso4_name: string
  paper_kind_name: string
  publisher_name: string
}
export type ConferenceAndJournalTableDisplays = ConferenceAndJournalTableDisplay[]

export function conferenceAndJournalsToTableDisplays(conferenceAndJournals: ConferenceAndJournals): ConferenceAndJournalTableDisplays {
  return conferenceAndJournals.map((conferenceAndJournal) => {
    return {
      name: conferenceAndJournal.name,
      short_name: conferenceAndJournal.short_name,
      iso4_name: conferenceAndJournal.iso4_name,
      paper_kind_name: conferenceAndJournal.paper_kind.name,
      publisher_name: conferenceAndJournal.publisher.name
    }
  })
}

export type PaperTableDisplay = {
  paper_kind_name: string
  title: string
  author_names: string
  conference_and_journal_name: string
  conference_and_journal_short_name: string
  conference_and_journal_iso4_name: string
  conference_and_journal_publisher_name: string
  start_page: number
  end_page: number
  year: number
  month: number
}

export type PaperTableDisplays = PaperTableDisplay[]

export function papersToTableDisplays(papers: Papers): PaperTableDisplays {
  return papers.map((paper) => {
    return {
      paper_kind_name: paper.paper_kind.name,
      title: paper.title,
      author_names: paper.authors.map((author) => `${author.ja_last_name} ${author.ja_first_name}`).join(', '),
      conference_and_journal_name: paper.conference_and_journal.name,
      conference_and_journal_short_name: paper.conference_and_journal.short_name,
      conference_and_journal_iso4_name: paper.conference_and_journal.iso4_name,
      conference_and_journal_publisher_name: paper.conference_and_journal.publisher.name,
      start_page: paper.start_page,
      end_page: paper.end_page,
      year: paper.year,
      month: paper.month
    }
  })
}
