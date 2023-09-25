import { Authors } from "./author"
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

// type for crud
export type JournalUpsertValues = Omit<Journal, 'id'>