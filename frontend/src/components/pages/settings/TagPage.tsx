import React from 'react'
import { TagForm } from '../../parts/settings/tag_form';
import { TagTable } from '../../parts/settings/tag_table';
import { useCommonModal } from '@/context/modal_context';

export const TagPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<TagForm type='create' />) }>追加</button>
			</div>
			<TagTable />
		</div>
	)
}