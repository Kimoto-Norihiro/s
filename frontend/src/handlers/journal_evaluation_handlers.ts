import axios from 'axios';
import { JournalEvaluation, JournalEvaluations } from '@/types/journal_evaluation';

export const createJournalEvaluation = async (data: JournalEvaluation) => {
	try {
		const res = await axios.post('http://localhost:8000/journal_evaluation', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listJournalEvaluations = async (setJournalEvaluationList: React.Dispatch<React.SetStateAction<JournalEvaluations>>) => {
	try {
		const res = await axios.get('http://localhost:8000/journal_evaluations', {
			withCredentials: true
		})
		setJournalEvaluationList(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getJournalEvaluation = async (id: number, year: number): Promise<JournalEvaluations | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/journal_evaluation/${id}/${year}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

export const updateJournalEvaluation = async (data: JournalEvaluation) => {
	try {
		const res = await axios.put(`http://localhost:8000/journal_evaluation`, data, {
			withCredentials: true
		})
		console.log('success to update journal_evaluation', res)
	} catch (err) {
		console.log('fail to update journal_evaluation', err)
	}
}

export const deleteJournalEvaluation = async (id: number, year: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/journal_evaluation/${id}/${year}`, {
			withCredentials: true
		})
		console.log('success to delete journal_evaluation', res)
	} catch (err) {
		console.log('fail to delete journal_evaluation', err)
	}
}
