import React, { useState } from 'react'
import { JournalForm } from '../../parts/index/journal_form';
import { JournalTable } from '../../parts/index/journal_table';

export const JournalPage = () => {
	return (
		<div className='p-4'>
			<JournalTable />
			<JournalForm />
		</div>
	)
}