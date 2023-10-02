import axios from 'axios';
import { InternationalConferenceUpsertValues, InternationalConferences } from '@/types/international_conference';

export const createInternationalConference = async (data: InternationalConferenceUpsertValues) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/international_conference', data, {
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

export const listInternationalConferences = async (setInternationalConferenceList: React.Dispatch<React.SetStateAction<InternationalConferences>>) => {
	try {
		const res = await axios.get('http://localhost:8000/international_conferences', {
			withCredentials: true
		})
		setInternationalConferenceList(res.data)
		console.log('indexInternationalConference',res.data)
	} catch (err) {
		console.log(err)
	}
}