import React from 'react'
import { DomesticConferenceInfoForm } from '../../parts/settings/domestic_conference_Info_form';
import { DomesticConferenceInfoTable } from '../../parts/settings/domestic_conference_info_table';
import { useCommonModal } from '@/context/modal_context';

export const DomesticConferenceInfoPage = () => {
	const { showModal } = useCommonModal() 
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<DomesticConferenceInfoForm/>) }>追加</button>
			</div>
			<DomesticConferenceInfoTable />
		</div>
	)
}