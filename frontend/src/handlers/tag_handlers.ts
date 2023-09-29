import axios from 'axios';
import { TagUpsertValues } from '@/components/parts/settings/tag_form';
import { Tags } from '@/types/tag';

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

export const listTags = async (setTagList: React.Dispatch<React.SetStateAction<Tags>>) => {
	try {
		const res = await axios.get('http://localhost:8000/tags', {
			withCredentials: true
		})
		setTagList(res.data)
		console.log('indexTag',res.data)
	} catch (err) {
		console.log(err)
	}
}