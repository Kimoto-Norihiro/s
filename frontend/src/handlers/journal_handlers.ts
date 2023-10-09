import axios from 'axios';
import { Journal, Journals } from '@/types/journal';

export const createJournal = async (data: Journal) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/journal', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
		if (err instanceof Error) {
			console.log('message', err.message)
		}
	}
}

export const listJournals = async (setJournalList: React.Dispatch<React.SetStateAction<Journals>>) => {
	try {
		const res = await axios.get('http://localhost:8000/journals', {
			withCredentials: true
		})
		setJournalList(res.data)
		console.log('indexJournal',res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getJournalById = async (id: number): Promise<Journals | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/journal/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateJournal = async (data: Journal) => {
	try {
		const res = await axios.put(`http://localhost:8000/journal`, data, {
			withCredentials: true
		})
		console.log('success to update journal', res)
	} catch (err) {
		console.log('fail to update journal', err)
	}
}

export const deleteJournal = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/journal/${id}`, {
			withCredentials: true
		})
		console.log('success to delete journal', res)
	} catch (err) {
		console.log('fail to delete journal', err)
	}
}