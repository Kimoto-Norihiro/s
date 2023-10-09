import React from 'react'
import { AwardForm } from '../../parts/index/award_form';
import { AwardTable } from '../../parts/index/award_table';
import { useCommonModal } from '@/context/modal_context';

export const AwardPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4' >
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<AwardForm type='create' />) }>追加</button>
			</div>
			<AwardTable />
		</div>
	)
}