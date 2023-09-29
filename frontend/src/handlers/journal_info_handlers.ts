import axios from 'axios';
import { JournalInfoUpsertValues, JournalInfos } from '@/types/journal_info';

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

export const listJournalInfos = async (setJournalInfoList: React.Dispatch<React.SetStateAction<JournalInfos>>) => {
	try {
		const res = await axios.get('http://localhost:8000/journal_infos', {
			withCredentials: true
		})
		setJournalInfoList(res.data)
		console.log('indexJournalInfo',res.data)
	} catch (err) {
		console.log(err)
	}
}