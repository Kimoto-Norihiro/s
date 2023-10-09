import React, { useState } from 'react'
import { JournalEvaluationForm } from '@/components/parts/settings/journal_evaluation_form'
import { JournalEvaluationTable } from '@/components/parts/settings/journal_evaluation_table'
import { useCommonModal } from '@/context/modal_context'
import { JournalEvaluations } from '@/types/journal_evaluation'

export const JournalEvaluationPage = () => {
	const [journalEvaluationList, setJournalEvaluationList] = useState<JournalEvaluations>([])
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalEvaluationForm type='create' setList={setJournalEvaluationList} />) }>追加</button>
			</div>
			<JournalEvaluationTable list={journalEvaluationList} setList={setJournalEvaluationList}/>
		</div>
	)
}