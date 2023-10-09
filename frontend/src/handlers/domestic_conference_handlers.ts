import axios from 'axios';
import { DomesticConference, DomesticConferences, DomesticConferenceFilter } from '@/types/domestic_conference';

export const createDomesticConference = async (data: DomesticConference) => {
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

export const listDomesticConferences = async (
	setDomesticConferenceList: React.Dispatch<React.SetStateAction<DomesticConferences>>, 
	filter: DomesticConferenceFilter = {} as DomesticConferenceFilter
) => {
	try {
		const res = await axios.post('http://localhost:8000/domestic_conferences', filter, {
			withCredentials: true
		})
		setDomesticConferenceList(res.data)
		console.log('indexDomesticConference',res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getDomesticConferenceById = async (id: number): Promise<DomesticConferences | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/domestic_conference/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateDomesticConference = async (data: DomesticConference) => {
	try {
		const res = await axios.put(`http://localhost:8000/domestic_conference`, data, {
			withCredentials: true
		})
		console.log('success to update domestic_conference', res)
	} catch (err) {
		console.log('fail to update domestic_conference', err)
	}
}

export const deleteDomesticConference = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/domestic_conference/${id}`, {
			withCredentials: true
		})
		console.log('success to delete domestic_conference', res)
	} catch (err) {
		console.log('fail to delete domestic_conference', err)
	}
}