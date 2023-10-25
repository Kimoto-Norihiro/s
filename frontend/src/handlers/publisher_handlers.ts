import axios from 'axios';
import { Publishers, Publisher } from '@/types/publisher';

export const listPublishers = async (setPublisherList: React.Dispatch<React.SetStateAction<Publishers>>) => {
	try {
		const res = await axios.get('http://localhost:8000/publishers', {
			withCredentials: true
		})
		setPublisherList(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const createPublisher = async (data: Publisher) => {
	try {
		const res = await axios.post('http://localhost:8000/publisher', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const getPublisherById = async (id: number): Promise<Publishers | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/publisher/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updatePublisher = async (data: Publisher) => {
	try {
		const res = await axios.put(`http://localhost:8000/publisher`, data, {
			withCredentials: true
		})
		console.log('success to update publisher', res)
	} catch (err) {
		console.log('fail to update publisher', err)
	}
}

export const deletePublisher = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/publisher/${id}`, {
			withCredentials: true
		})
		console.log('success to delete publisher', res)
	} catch (err) {
		console.log('fail to delete publisher', err)
	}
}