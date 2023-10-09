import axios from 'axios';
import { Award, Awards, AwardFilter } from '@/types/award';

export const createAward = async (data: Award) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/award', data, {
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

export const listAwards = async (
		setAwardList: React.Dispatch<React.SetStateAction<Awards>>,
		filter: AwardFilter = {} as AwardFilter
	) => {
	try {
		const res = await axios.post('http://localhost:8000/awards', filter, {
			withCredentials: true
		})
		setAwardList(res.data)
		console.log('indexAward',res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getAwardById = async (id: number): Promise<Awards | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/award/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateAward = async (data: Award) => {
	try {
		const res = await axios.put(`http://localhost:8000/award`, data, {
			withCredentials: true
		})
		console.log('success to update award', res)
	} catch (err) {
		console.log('fail to update award', err)
	}
}

export const deleteAward = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/award/${id}`, {
			withCredentials: true
		})
		console.log('success to delete award', res)
	} catch (err) {
		console.log('fail to delete award', err)
	}
}