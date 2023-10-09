import React from 'react'
import { JournalEvaluationForm } from '@/components/parts/settings/journal_evaluation_form'
import { JournalEvaluationTable } from '@/components/parts/settings/journal_evaluation_table'
import { useCommonModal } from '@/context/modal_context'

export const JournalEvaluationPage = () => {
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalEvaluationForm type='create' />) }>追加</button>
			</div>
			<JournalEvaluationTable/>
		</div>
	)
}