import axios from 'axios';
import { InternationalConference, InternationalConferences } from '@/types/international_conference';

export const createInternationalConference = async (data: InternationalConference) => {
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

export const getInternationalConferenceById = async (id: number): Promise<InternationalConferences | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/international_conference/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateInternationalConference = async (data: InternationalConference) => {
	try {
		const res = await axios.put(`http://localhost:8000/international_conference`, data, {
			withCredentials: true
		})
		console.log('success to update international_conference', res)
	} catch (err) {
		console.log('fail to update international_conference', err)
	}
}

export const deleteInternationalConference = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/international_conference/${id}`, {
			withCredentials: true
		})
		console.log('success to delete international_conference', res)
	} catch (err) {
		console.log('fail to delete international_conference', err)
	}
}