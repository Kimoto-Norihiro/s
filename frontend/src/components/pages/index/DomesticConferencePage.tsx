import React from 'react'
import { DomesticConferenceForm } from '../../parts/index/domestic_conference_form';
import { DomesticConferenceTable } from '../../parts/index/domestic_conference_table';
import { useCommonModal } from '@/context/modal_context';

export const DomesticConferencePage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<DomesticConferenceForm type='create' />) }>追加</button>
			</div>
			<DomesticConferenceTable />
		</div>
	)
}