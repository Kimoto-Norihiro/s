import axios from "axios"
import { Author, Authors } from '../types/author';

export async function createAuthor(data: Author) {
	try {
		const res = await axios.post('http://localhost:8000/author', data, {
			withCredentials: true
		})
		console.log('success to create author', res)
	} catch (err) {
		console.log('fail to create author', err)
	}
}

export async function updateAuthor(data: Author) {
	try {
		const res = await axios.put(`http://localhost:8000/author`, data, {
			withCredentials: true
		})
		console.log('success to update author', res)
	} catch (err) {
		console.log('fail to update author', err)
	}
}

export async function listAuthors(setAuthorList: React.Dispatch<React.SetStateAction<Authors>>) {
	try {
		const res = await axios.get('http://localhost:8000/authors', {
			withCredentials: true
		})
		setAuthorList(res.data)
	} catch (err) {
		console.log('fail to index author', err)
	}
}

export async function getAuthorById(id: number): Promise<Author | any> {
	try {
		const res = await axios.get(`http://localhost:8000/author/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export async function deleteAuthor(id: number) {
	try {
		const res = await axios.delete(`http://localhost:8000/author/${id}`, {
			withCredentials: true
		})
		console.log('success to delete author', res)
	} catch (err) {
		console.log('fail to delete author', err)
	}
}
