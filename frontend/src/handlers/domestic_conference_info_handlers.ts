import axios from 'axios';
import { DomesticConferenceInfo, DomesticConferenceInfos } from '@/types/domestic_conference_info';

export const createDomesticConferenceInfo = async (data: DomesticConferenceInfo) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/domestic_conference_info', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listDomesticConferenceInfos = async (setDomesticConferenceInfoList: React.Dispatch<React.SetStateAction<DomesticConferenceInfos>>) => {
	try {
		const res = await axios.get('http://localhost:8000/domestic_conference_infos', {
			withCredentials: true
		})
		setDomesticConferenceInfoList(res.data)
		console.log('indexDomesticConferenceInfo',res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getDomesticConferenceInfoById = async (id: number): Promise<DomesticConferenceInfos | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/domestic_conference_info/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateDomesticConferenceInfo = async (data: DomesticConferenceInfo) => {
	try {
		const res = await axios.put(`http://localhost:8000/domestic_conference_info`, data, {
			withCredentials: true
		})
		console.log('success to update domestic_conference_info', res)
	} catch (err) {
		console.log('fail to update domestic_conference_info', err)
	}
}

export const deleteDomesticConferenceInfo = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/domestic_conference_info/${id}`, {
			withCredentials: true
		})
		console.log('success to delete domestic_conference_info', res)
	} catch (err) {
		console.log('fail to delete domestic_conference_info', err)
	}
}