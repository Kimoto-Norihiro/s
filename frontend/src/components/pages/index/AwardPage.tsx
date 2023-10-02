import React from 'react'
import { AwardForm } from '../../parts/index/award_form';
import { AwardTable } from '../../parts/index/award_table';

export const AwardPage = () => {
	return (
		<div className='p-4' >
			<AwardForm />
			<AwardTable />
		</div>
	)
}