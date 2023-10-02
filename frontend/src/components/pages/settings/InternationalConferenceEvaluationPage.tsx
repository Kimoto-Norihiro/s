import React from 'react'
import { InternationalConferenceEvaluationForm } from '../../parts/settings/international_conference_evaluation_form';
import { InternationalConferenceEvaluationTable } from '../../parts/settings/international_conference_evaluation_table';

export const InternationalConferenceEvaluationPage = () => {
	return (
		<div className='p-4'>
			<InternationalConferenceEvaluationForm />
			<InternationalConferenceEvaluationTable />
		</div>
	)
}