import React from 'react'
import { AuthorForm } from '../../parts/settings/author_form';
import { AuthorTable } from '../../parts/settings/author_table';
import { useCommonModal } from '@/context/modal_context';

export const AuthorPage = () => {
	const { showModal } = useCommonModal() 
	return (
		<div className='p-4'>
			<button onClick={() => showModal(<AuthorForm/>) }>追加form</button>
			<AuthorTable/>
		</div>
	)
}