import React from 'react'
import { PublisherForm } from '../../parts/settings/publisher_form';
import { PublisherTable } from '../../parts/settings/publisher_table';

export const PublisherPage = () => {
	return (
		<div className='p-4'>
			<PublisherForm />
			<PublisherTable />
		</div>
	)
}