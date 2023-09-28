import axios from 'axios';
import { Publishers, PublisherUpsertValues } from '@/types/publisher';

export const listPublishers = async (setPublisherList: React.Dispatch<React.SetStateAction<Publishers>>) => {
	try {
		const res = await axios.get('http://localhost:8080/publishers', {
			withCredentials: true
		})
		setPublisherList(res.data)
		console.log('indexPublisher',res.data)
	} catch (err) {
		console.log(err)
	}
}

export const createPublisher = async (data: PublisherUpsertValues) => {
	try {
		const res = await axios.post('http://localhost:8000/publisher', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}