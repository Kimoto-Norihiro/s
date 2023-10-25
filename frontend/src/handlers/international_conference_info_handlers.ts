import axios from 'axios';
import { InternationalConferenceInfo, InternationalConferenceInfos } from '@/types/international_conference_info';
import { deleteInternationalConference } from './international_conference_handlers';

export const createInternationalConferenceInfo = async (data: InternationalConferenceInfo) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/international_conference_info', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listInternationalConferenceInfos = async (setInternationalConferenceInfoList: React.Dispatch<React.SetStateAction<InternationalConferenceInfos>>) => {
	try {
		const res = await axios.get('http://localhost:8000/international_conference_infos', {
			withCredentials: true
		})
		setInternationalConferenceInfoList(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getInternationalConferenceInfoById = async (id: number): Promise<InternationalConferenceInfos | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/international_conference_info/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateInternationalConferenceInfo = async (data: InternationalConferenceInfo) => {
	try {
		const res = await axios.put(`http://localhost:8000/international_conference_info`, data, {
			withCredentials: true
		})
		console.log('success to update international_conference_info', res)
	} catch (err) {
		console.log('fail to update international_conference_info', err)
	}
}

export const deleteInternationalConferenceInfo = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/international_conference_info/${id}`, {
			withCredentials: true
		})
		console.log('success to delete international_conference_info', res)
	} catch (err) {
		console.log('fail to delete international_conference_info', err)
	}
}
