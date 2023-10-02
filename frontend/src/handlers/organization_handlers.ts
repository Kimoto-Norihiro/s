import axios from 'axios';
import { Organizations, OrganizationUpsertValues } from '@/types/organization';

export async function createOrganization(data: OrganizationUpsertValues) {
	try {
		const res = await axios.post('http://localhost:8000/organization', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export async function listOrganizations(setOrganizationList: React.Dispatch<React.SetStateAction<Organizations>>) {
	try {
		const res = await axios.get('http://localhost:8000/organizations', {
			withCredentials: true
		})
		setOrganizationList(res.data)
		console.log('indexOrganization',res.data)
	} catch (err) {
		console.log(err)
	}
}