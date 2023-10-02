import axios from 'axios';
import { InternationalConferenceEvaluationUpsertValues, InternationalConferenceEvaluations } from '@/types/international_conference_evaluation';

export const createInternationalConferenceEvaluation = async (data: InternationalConferenceEvaluationUpsertValues) => {
	try {
		const res = await axios.post('http://localhost:8000/international_conference_evaluation', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listInternationalConferenceEvaluations = async (setInternationalConferenceEvaluationList: React.Dispatch<React.SetStateAction<InternationalConferenceEvaluations>>) => {
	try {
		const res = await axios.get('http://localhost:8000/international_conference_evaluations', {
			withCredentials: true
		})
		setInternationalConferenceEvaluationList(res.data)
		console.log('indexInternationalConferenceEvaluation',res.data)
	} catch (err) {
		console.log(err)
	}
}
