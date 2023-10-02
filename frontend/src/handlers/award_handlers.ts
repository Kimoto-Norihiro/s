import axios from 'axios';
import { AwardUpsertValues, Awards } from '@/types/award';

export const createAward = async (data: AwardUpsertValues) => {
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

export const listAwards = async (setAwardList: React.Dispatch<React.SetStateAction<Awards>>) => {
	try {
		const res = await axios.get('http://localhost:8000/awards', {
			withCredentials: true
		})
		setAwardList(res.data)
		console.log('indexAward',res.data)
	} catch (err) {
		console.log(err)
	}
}