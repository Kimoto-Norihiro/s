import axios from 'axios';
import { Organizations, Organization } from '@/types/organization';

export async function createOrganization(data: Organization) {
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

export async function getOrganizationById(id: number): Promise<Organizations | any> {
	try {
		const res = await axios.get(`http://localhost:8000/organization/${id}`, {
			withCredentials: true
		})
		return res.data
	} catch (err) {
		return err
	}
}

export async function updateOrganization(data: Organization) {
	try {
		const res = await axios.put(`http://localhost:8000/organization`, data, {
			withCredentials: true
		})
		console.log('success to update organization', res)
	} catch (err) {
		console.log('fail to update organization', err)
	}
}

export async function deleteOrganization(id: number) {
	try {
		const res = await axios.delete(`http://localhost:8000/organization/${id}`, {
			withCredentials: true
		})
		console.log('success to delete organization', res)
	} catch (err) {
		console.log('fail to delete organization', err)
	}
}