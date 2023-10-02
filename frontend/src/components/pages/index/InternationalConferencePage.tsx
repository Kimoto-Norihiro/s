import React from 'react'
import { InternationalConferenceForm } from '@/components/parts/index/international_conference_form'
import { InternationalConferenceTable } from '@/components/parts/index/international_conference_table'

export const InternationalConferencePage = () => {
	return (
		<div className='p-4'>
			<InternationalConferenceForm />
			<InternationalConferenceTable />
		</div>
	)
}
