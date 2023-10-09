import React from 'react'
import { InternationalConferenceForm } from '@/components/parts/index/international_conference_form'
import { InternationalConferenceTable } from '@/components/parts/index/international_conference_table'
import { useCommonModal } from '@/context/modal_context'

export const InternationalConferencePage = () => {
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceForm type='create' />) }>追加</button>
			</div>
			<InternationalConferenceTable />
		</div>
	)
}
