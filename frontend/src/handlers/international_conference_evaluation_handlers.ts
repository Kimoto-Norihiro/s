import axios from 'axios';
import { InternationalConferenceEvaluation, InternationalConferenceEvaluations } from '@/types/international_conference_evaluation';

export const createInternationalConferenceEvaluation = async (data: InternationalConferenceEvaluation) => {
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

export const getInternationalConferenceEvaluation = async (id: number, year: number): Promise<InternationalConferenceEvaluations | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/international_conference_evaluation/${id}/${year}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

export const updateInternationalConferenceEvaluation = async (data: InternationalConferenceEvaluation) => {
	try {
		const res = await axios.put(`http://localhost:8000/international_conference_evaluation`, data, {
			withCredentials: true
		})
		console.log('success to update international_conference_evaluation', res)
	} catch (err) {
		console.log('fail to update international_conference_evaluation', err)
	}
}

export const DeleteInternationalConferenceEvaluation = async (id: number, year: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/international_conference_evaluation/${id}/${year}`, {
			withCredentials: true
		})
		console.log('success to delete international_conference_evaluation', res)
	} catch (err) {
		console.log('fail to delete international_conference_evaluation', err)
	}
}