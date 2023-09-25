import React from 'react'
import { TagForm } from '../../parts/settings/tag_form';
import { TagTable } from '../../parts/settings/tag_table';

export const TagPage = () => {
	return (
		<div className='p-4'>
			<TagForm />
			<TagTable />
		</div>
	)
}