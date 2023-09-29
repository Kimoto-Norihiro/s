import React from 'react'
import { JournalEvaluationForm } from '@/components/parts/settings/journal_evaluation_form'
import { JournalEvaluationTable } from '@/components/parts/settings/journal_evaluation_table'

export const JournalEvaluationPage = () => {
	return (
		<div className='p-4'>
			<JournalEvaluationForm/>
			<JournalEvaluationTable/>
		</div>
	)
}