import axios from 'axios';
import { Country, Countries } from '@/types/country';

export async function createCountry(data: Country) {
	try {
		const res = await axios.post('http://localhost:8000/country', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export async function listCountries(setCountryList: React.Dispatch<React.SetStateAction<Countries>>) {
	try {
		const res = await axios.get('http://localhost:8000/countries', {
			withCredentials: true
		})
		setCountryList(res.data)
		console.log('indexCountry',res.data)
	} catch (err) {
		console.log(err)
	}
}

export async function getCountryById(id: number): Promise<Country | any> {
	try {
		const res = await axios.get(`http://localhost:8000/country/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export async function updateCountry(data: Country) {
	try {
		const res = await axios.put(`http://localhost:8000/country`, data, {
			withCredentials: true
		})
		console.log('success to update country', res)
	} catch (err) {
		console.log('fail to update country', err)
	}
}

export async function deleteCountry(id: number) {
	try {
		const res = await axios.delete(`http://localhost:8000/country/${id}`, {
			withCredentials: true
		})
		console.log('success to delete country', res)
	} catch (err) {
		console.log('fail to delete country', err)
	}
}