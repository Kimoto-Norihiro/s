import React, { useState } from 'react'
import { InternationalConferenceForm } from '@/components/parts/index/international_conference_form'
import { InternationalConferenceTable } from '@/components/parts/index/international_conference_table'
import { useCommonModal } from '@/context/modal_context'
import { InternationalConferences } from '@/types/international_conference'
import { InternationalConferenceSearch } from '@/components/parts/index/international_conference_search'

export const InternationalConferencePage = () => {
	const [internationalConferenceList, setInternationalConferenceList] = useState<InternationalConferences>([])
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceForm type='create' setList={setInternationalConferenceList} />) }>追加</button>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceSearch setInternationalConferenceList={setInternationalConferenceList} />) }>検索</button>
			</div>
			<InternationalConferenceTable 
				list={internationalConferenceList} 
				setList={setInternationalConferenceList}
			/>
		</div>
	)
}
