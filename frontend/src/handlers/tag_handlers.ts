import axios from 'axios';
import { TagUpsertValues } from '@/components/parts/edit_consts/tag_form';

export const createTag = async (data: TagUpsertValues) => {
	try {
		const res = await axios.post('http://localhost:8000/tag', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}