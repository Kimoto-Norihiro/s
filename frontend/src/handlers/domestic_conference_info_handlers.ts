import axios from 'axios';
import { DomesticConferenceInfoUpsertValues, DomesticConferenceInfos } from '@/types/domestic_conference_info';

export const createDomesticConferenceInfo = async (data: DomesticConferenceInfoUpsertValues) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/domestic_conference_info', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listDomesticConferenceInfos = async (setDomesticConferenceInfoList: React.Dispatch<React.SetStateAction<DomesticConferenceInfos>>) => {
	try {
		const res = await axios.get('http://localhost:8000/domestic_conference_infos', {
			withCredentials: true
		})
		setDomesticConferenceInfoList(res.data)
		console.log('indexDomesticConferenceInfo',res.data)
	} catch (err) {
		console.log(err)
	}
}