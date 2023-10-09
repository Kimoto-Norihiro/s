import React, { useState } from 'react'
import { DomesticConferenceForm } from '../../parts/index/domestic_conference_form';
import { DomesticConferenceTable } from '../../parts/index/domestic_conference_table';
import { useCommonModal } from '@/context/modal_context';
import { DomesticConferenceSearch } from '@/components/parts/index/domestic_conference_search';
import { DomesticConferences } from '../../../types/domestic_conference';

export const DomesticConferencePage = () => {
	const [domesticConferenceList, setDomesticConferenceList] = useState<DomesticConferences>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button 
					className='btn px-2 py-1' 
					onClick={() => showModal(
						<DomesticConferenceForm 
							type='create' 
							setList={setDomesticConferenceList} 
						/>) 
					}
				>
					追加
				</button>
				<button 
					className='btn px-2 py-1' 
					onClick={() => showModal(<DomesticConferenceSearch/>) }
				>
					検索
				</button>
			</div>
			<DomesticConferenceTable 
				list={domesticConferenceList} 
				setList={setDomesticConferenceList}
			/>
		</div>
	)
}