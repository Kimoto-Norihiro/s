import React, { useState } from 'react'
import { InternationalConferenceEvaluationForm } from '../../parts/settings/international_conference_evaluation_form';
import { InternationalConferenceEvaluationTable } from '../../parts/settings/international_conference_evaluation_table';
import { useCommonModal } from '@/context/modal_context';
import { InternationalConferenceEvaluations } from '@/types/international_conference_evaluation';

export const InternationalConferenceEvaluationPage = () => {
	const [internationalConferenceEvaluationList, setInternationalConferenceEvaluationList] = useState<InternationalConferenceEvaluations>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceEvaluationForm type='create' setList={setInternationalConferenceEvaluationList} />) }>追加</button>
			</div>
			<InternationalConferenceEvaluationTable list={internationalConferenceEvaluationList} setList={setInternationalConferenceEvaluationList} />
		</div>
	)
}