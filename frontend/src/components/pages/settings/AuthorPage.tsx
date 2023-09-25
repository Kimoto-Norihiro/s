import React from 'react'
import { AuthorForm } from '../../parts/settings/author_form';
import { AuthorTable } from '../../parts/settings/author_table';

export const AuthorPage = () => {
	return (
		<div className='p-4'>
			<AuthorForm/>
			<AuthorTable/>
		</div>
	)
}