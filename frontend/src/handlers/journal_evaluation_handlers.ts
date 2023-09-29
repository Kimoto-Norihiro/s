import axios from 'axios';
import { JournalEvaluationUpsertValues, JournalEvaluations } from '@/types/journal_evaluation';

export const createJournalEvaluation = async (data: JournalEvaluationUpsertValues) => {
	try {
		const res = await axios.post('http://localhost:8000/journal_evaluation', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const ListJournalEvaluations = async (setJournalEvaluationList: React.Dispatch<React.SetStateAction<JournalEvaluations>>) => {
	try {
		const res = await axios.get('http://localhost:8000/journal_evaluations', {
			withCredentials: true
		})
		setJournalEvaluationList(res.data)
		console.log('indexJournalEvaluation',res.data)
	} catch (err) {
		console.log(err)
	}
}
