import React, { useState } from 'react'
import { JournalInfoForm } from '@/components/parts/settings/journal_info_form'
import { JournalInfoTable } from '@/components/parts/settings/journal_info_table'
import { useCommonModal } from '@/context/modal_context'
import { JournalInfos } from '@/types/journal_info'

export const JournalInfoPage = () => {
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<JournalInfoForm type='create' setList={setJournalInfoList} />) }>追加</button>
			</div>
			<JournalInfoTable list={journalInfoList} setList={setJournalInfoList}/>
		</div>
	)
}