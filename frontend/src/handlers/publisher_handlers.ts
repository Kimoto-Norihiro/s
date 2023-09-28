import axios from 'axios';
import { Publishers } from '@/types/publisher';

export const ListPublishers = async (setPublisherList: React.Dispatch<React.SetStateAction<Publishers>>) => {
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