import React from 'react'
import { JournalInfoForm } from '@/components/parts/settings/journal_info_form'
import { JournalInfoTable } from '@/components/parts/settings/journal_info_table'

export const JournalInfoPage = () => {
	return (
		<div className='p-4'>
			<JournalInfoForm/>
			<JournalInfoTable/>
		</div>
	)
}