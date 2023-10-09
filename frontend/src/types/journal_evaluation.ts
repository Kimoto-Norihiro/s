import { JournalInfo } from "./journal_info"

export type JournalEvaluation = {
  journal_info_id: number
	journal_info: JournalInfo
  year: number
  if: number
  acceptance_rate: number
  number_of_submitted_papers: number
  number_of_accepted_papers: number
}
export type JournalEvaluations = JournalEvaluation[]

// type for table display
export type JournalEvaluationTableDisplay = Omit<JournalEvaluation, 'journal_info'> & { journal_info_name: string }
export type JournalEvaluationTableDisplays = JournalEvaluationTableDisplay[]

export function journalEvaluationsToTableDisplays(journalEvaluations: JournalEvaluations): JournalEvaluationTableDisplays {
	return journalEvaluations.map((journalEvaluation) => {
		return {
			journal_info_id: journalEvaluation.journal_info_id,
			journal_info_name: journalEvaluation.journal_info.name,
			year: journalEvaluation.year,
			if: journalEvaluation.if,
			acceptance_rate: journalEvaluation.acceptance_rate,
			number_of_submitted_papers: journalEvaluation.number_of_submitted_papers,
			number_of_accepted_papers: journalEvaluation.number_of_accepted_papers
		}
	})
}