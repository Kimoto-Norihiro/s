import axios from 'axios';
import { InternationalConferenceInfoUpsertValues, InternationalConferenceInfos } from '@/types/international_conference_info';

export const createInternationalConferenceInfo = async (data: InternationalConferenceInfoUpsertValues) => {
	console.log('data', data)
	try {
		const res = await axios.post('http://localhost:8000/international_conference_info', data, {
			withCredentials: true
		})
		console.log(res.data)
	} catch (err) {
		console.log(err)
	}
}

export const listInternationalConferenceInfos = async (setInternationalConferenceInfoList: React.Dispatch<React.SetStateAction<InternationalConferenceInfos>>) => {
	try {
		const res = await axios.get('http://localhost:8000/international_conference_infos', {
			withCredentials: true
		})
		setInternationalConferenceInfoList(res.data)
		console.log('indexInternationalConferenceInfo',res.data)
	} catch (err) {
		console.log(err)
	}
}