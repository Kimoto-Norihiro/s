import React from 'react'
import { DomesticConferenceInfoForm } from '../../parts/settings/domestic_conference_Info_form';
import { DomesticConferenceInfoTable } from '../../parts/settings/domestic_conference_info_table';

export const DomesticConferenceInfoPage = () => {
	return (
		<div className='p-4'>
			<DomesticConferenceInfoForm />
			<DomesticConferenceInfoTable />
		</div>
	)
}