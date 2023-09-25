import React from 'react'
import { PublisherForm } from '../../parts/edit_consts/publisher_form';
import { PublisherTable } from '../../parts/edit_consts/publisher_table';

export const PublisherPage = () => {
	return (
		<div className='p-4'>
			<PublisherForm />
			<PublisherTable />
		</div>
	)
}