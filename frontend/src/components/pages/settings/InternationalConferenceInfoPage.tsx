import React from 'react'
import { InternationalConferenceInfoForm } from '../../parts/settings/international_conference_Info_form';
import { InternationalConferenceInfoTable } from '@/components/parts/settings/international_conference_info_table';

export const InternationalConferenceInfoPage = () => {
	return (
		<div className='p-4'>
			<InternationalConferenceInfoForm />
			<InternationalConferenceInfoTable />
		</div>
	)
}