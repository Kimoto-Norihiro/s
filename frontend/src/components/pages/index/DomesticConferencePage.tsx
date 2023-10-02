import React from 'react'
import { DomesticConferenceForm } from '../../parts/index/domestic_conference_form';
import { DomesticConferenceTable } from '../../parts/index/domestic_conference_table';

export const DomesticConferencePage = () => {
	return (
		<div className='p-4'>
			<DomesticConferenceForm />
			<DomesticConferenceTable />
		</div>
	)
}