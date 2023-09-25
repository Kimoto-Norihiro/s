import React from 'react'
import { AuthorForm } from '../../parts/edit_consts/author_form';
import { AuthorTable } from '../../parts/edit_consts/author_table';

export const AuthorPage = () => {
	return (
		<div className='p-4'>
			<AuthorForm/>
			<AuthorTable/>
		</div>
	)
}