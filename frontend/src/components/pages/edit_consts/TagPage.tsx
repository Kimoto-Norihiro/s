import React from 'react'
import { TagForm } from '../../parts/edit_consts/tag_form';
import { TagTable } from '../../parts/edit_consts/tag_table';

export const TagPage = () => {
	return (
		<div className='p-4'>
			<TagForm />
			<TagTable />
		</div>
	)
}