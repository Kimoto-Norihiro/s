import React, { useState } from 'react'
import { DomesticConferenceInfoForm } from '../../parts/settings/domestic_conference_Info_form';
import { DomesticConferenceInfoTable } from '../../parts/settings/domestic_conference_info_table';
import { useCommonModal } from '@/context/modal_context';
import { DomesticConferenceInfos } from '@/types/domestic_conference_info'; 

export const DomesticConferenceInfoPage = () => {
	const [domesticConferenceInfoList, setDomesticConferenceInfoList] = useState<DomesticConferenceInfos>([])
	const { showModal } = useCommonModal() 
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<DomesticConferenceInfoForm type='create' setList={setDomesticConferenceInfoList} />) }>追加</button>
			</div>
			<DomesticConferenceInfoTable list={domesticConferenceInfoList} setList={setDomesticConferenceInfoList} />
		</div>
	)
}