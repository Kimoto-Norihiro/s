import React from 'react'
import { InternationalConferenceInfoForm } from '../../parts/settings/international_conference_Info_form';
import { InternationalConferenceInfoTable } from '@/components/parts/settings/international_conference_info_table';
import { useCommonModal } from '@/context/modal_context';

export const InternationalConferenceInfoPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceInfoForm />) }>追加</button>
			</div>
			<InternationalConferenceInfoTable />
		</div>
	)
}