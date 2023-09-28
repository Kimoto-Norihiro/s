import axios from 'axios';
import { JournalInfoUpsertValues } from '@/types/journal_info';

export const createJournalInfo = async (data: JournalInfoUpsertValues) => {
	try {
		const res = await axios.post('http://localhost:8000/journal_info', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}