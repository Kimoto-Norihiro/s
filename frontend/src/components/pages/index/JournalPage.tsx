import React, { useState } from 'react'
import { JournalForm } from '../../parts/index/journal_form';
import { JournalTable } from '../../parts/index/journal_table';
import { useCommonModal } from '@/context/modal_context';
import { Journals } from '@/types/journal';
import { JournalSearch } from '@/components/parts/index/journal_search';

export const JournalPage = () => {
	const [journalList, setJournalList] = useState<Journals>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalForm type='create' setList={setJournalList} />) }>追加</button>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalSearch setJournalList={setJournalList}/>) }>検索</button>
			</div>
			<JournalTable list={journalList} setList={setJournalList}/>
		</div>
	)
}