import axios from "axios"
import { AuthorUpsertValues } from '../components/parts/settings/author_form';
import { error } from "console";

export async function CreateAuthor(data: AuthorUpsertValues): Promise<Error | null> {
	try {
		const res = await axios.post('http://localhost:8000/author', data, {
			withCredentials: true
		})
		console.log('success to create author', res)
		return null
	} catch (err) {
		if (err instanceof Error) {
			console.log('fail to create author', err.message)
			return err
		} else {
			throw err
		}
	}
}

export async function IndexAuthor(): Promise<any | Error> {
	try {
		const res = await axios.get('http://localhost:8000/authors', {
			withCredentials: true
		})
		console.log('indexAuthor', res.data)
		return res.data, null
	} catch (err) {
		if (err instanceof Error) {
			console.log('fail to index author', err.message)
			return err
		} else {
			throw err
		}
	}
}

