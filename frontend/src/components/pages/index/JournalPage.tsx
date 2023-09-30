import React, { useState } from 'react'
import { JournalForm } from '../../parts/index/journal_form';
import { JournalTable } from '../../parts/index/journal_table';

type PageState = 'list' | 'create' | 'edit'

export const JournalPage = () => {
	const [state, setState] = useState<PageState>(`list`)
	return (
		<div className='p-4'>
			<JournalTable />
			<JournalForm />
		</div>
	)
}