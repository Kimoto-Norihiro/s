import React, { useState } from 'react'
import { JournalForm } from '../../parts/index/journal_form';
import { JournalTable } from '../../parts/index/journal_table';
import { useCommonModal } from '@/context/modal_context';

export const JournalPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalForm type='create' />) }>追加</button>
			</div>
			<JournalTable />
		</div>
	)
}