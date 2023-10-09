import { InternationalConferenceInfo } from "./international_conference_info"

export type InternationalConferenceEvaluation = {
  international_conference_info_id: number
	international_conference_info: InternationalConferenceInfo
  year: number
  core_rank: number
	qualis: number
	rank_guide2research: number
  acceptance_rate: number
  number_of_submitted_papers: number
  number_of_accepted_papers: number
}
export type InternationalConferenceEvaluations = InternationalConferenceEvaluation[]

// type for table display
export type InternationalConferenceEvaluationTableDisplay = Omit<InternationalConferenceEvaluation, 'international_conference_info'> & { international_conference_info_name: string }
export type InternationalConferenceEvaluationTableDisplays = InternationalConferenceEvaluationTableDisplay[]

export function internationalConferenceEvaluationsToTableDisplays(international_conference_evaluations: InternationalConferenceEvaluations): InternationalConferenceEvaluationTableDisplays {
	return international_conference_evaluations.map((international_conference_evaluation) => {
		return {
			international_conference_info_id: international_conference_evaluation.international_conference_info_id,
			international_conference_info_name: international_conference_evaluation.international_conference_info.name,
			year: international_conference_evaluation.year,
			core_rank: international_conference_evaluation.core_rank,
			qualis: international_conference_evaluation.qualis,
			rank_guide2research: international_conference_evaluation.rank_guide2research,
			acceptance_rate: international_conference_evaluation.acceptance_rate,
			number_of_submitted_papers: international_conference_evaluation.number_of_submitted_papers,
			number_of_accepted_papers: international_conference_evaluation.number_of_accepted_papers
		}
	})
}