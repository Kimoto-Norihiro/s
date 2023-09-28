import axios from "axios"
import { AuthorUpsertValues } from '../components/parts/settings/author_form';
import { Authors } from '../types/author';

export async function CreateAuthor(data: AuthorUpsertValues) {
	try {
		const res = await axios.post('http://localhost:8000/author', data, {
			withCredentials: true
		})
		console.log('success to create author', res)
	} catch (err) {
		console.log('fail to create author', err)
	}
}

export async function IndexAuthor(setAuthorList: React.Dispatch<React.SetStateAction<Authors>>) {
	try {
		const res = await axios.get('http://localhost:8000/authors', {
			withCredentials: true
		})
		console.log('indexAuthor', res.data)
		setAuthorList(res.data)
	} catch (err) {
		console.log('fail to index author', err)
	}
}

