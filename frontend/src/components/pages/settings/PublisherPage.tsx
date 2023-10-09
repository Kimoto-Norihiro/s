import React from 'react'
import { PublisherForm } from '../../parts/settings/publisher_form';
import { PublisherTable } from '../../parts/settings/publisher_table';
import { useCommonModal } from '@/context/modal_context';

export const PublisherPage = () => {
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<PublisherForm type='create' />) }>追加</button>
			</div>
			<PublisherTable />
		</div>
	)
}