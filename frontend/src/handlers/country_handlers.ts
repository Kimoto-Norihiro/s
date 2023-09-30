import axios from 'axios';
import { CountryUpsertValues } from '@/types/country';

export async function createCountry(data: CountryUpsertValues) {
	try {
		const res = await axios.post('http://localhost:8000/country', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export async function listCountries(setCountryList: React.Dispatch<React.SetStateAction<CountryUpsertValues[]>>) {
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