import axios from 'axios';
import { DomesticConferenceUpsertValues, DomesticConferences } from '@/types/domestic_conference';

export const createDomesticConference = async (data: DomesticConferenceUpsertValues) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/domestic_conference', data, {
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

export const listDomesticConferences = async (setDomesticConferenceList: React.Dispatch<React.SetStateAction<DomesticConferences>>) => {
	try {
		const res = await axios.get('http://localhost:8000/domestic_conferences', {
			withCredentials: true
		})
		setDomesticConferenceList(res.data)
		console.log('indexDomesticConference',res.data)
	} catch (err) {
		console.log(err)
	}
}