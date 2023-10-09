import axios from 'axios';
import { Tag, Tags } from '@/types/tag';

export const createTag = async (data: Tag) => {
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

export const getTagById = async (id: number): Promise<Tags | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/tag/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export const updateTag = async (data: Tag) => {
	try {
		const res = await axios.put(`http://localhost:8000/tag`, data, {
			withCredentials: true
		})
		console.log('success to update tag', res)
	} catch (err) {
		console.log('fail to update tag', err)
	}
}

export const deleteTag = async (id: number) => {
	try {
		const res = await axios.delete(`http://localhost:8000/tag/${id}`, {
			withCredentials: true
		})
		console.log('success to delete tag', res)
	} catch (err) {
		console.log('fail to delete tag', err)
	}
}

export const listTagsByJournalId = async (id: number): Promise<Tags | any> => {
	try {
		const res = await axios.get(`http://localhost:8000/tags/journal/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}