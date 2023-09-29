import axios from 'axios';
import { JournalUpsertValues } from '@/types/journal';

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