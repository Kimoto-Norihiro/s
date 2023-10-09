import axios from 'axios';
import { JournalInfo, JournalInfos } from '@/types/journal_info';

export const createJournalInfo = async (data: JournalInfo) => {
	console.log('data', data)
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

export const getJournalInfoById = async (id: number): Promise<JournalInfos | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/journal_info/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateJournalInfo = async (data: JournalInfo) => {
	try {
		const res = await axios.put(`http://localhost:8000/journal_info`, data, {
			withCredentials: true
		})
		console.log('success to update journal_info', res)
	} catch (err) {
		console.log('fail to update journal_info', err)
	}
}

export const deleteJournalInfo = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/journal_info/${id}`, {
			withCredentials: true
		})
		console.log('success to delete journal_info', res)
	} catch (err) {
		console.log('fail to delete journal_info', err)
	}
}