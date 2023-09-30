import axios from 'axios';
import { JournalUpsertValues, Journals } from '@/types/journal';

export const createJournal = async (data: JournalUpsertValues) => {
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