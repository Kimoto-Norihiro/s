import React, { useState } from 'react'
import { AuthorForm } from '../../parts/settings/author_form';
import { AuthorTable } from '../../parts/settings/author_table';
import { useCommonModal } from '@/context/modal_context';
import { Authors } from '@/types/author';

export const AuthorPage = () => {
	const [authorList, setAuthorList] = useState<Authors>([])
	const { showModal } = useCommonModal() 
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<AuthorForm type='create' setList={setAuthorList}/>) }>追加</button>
			</div>
			<AuthorTable list={authorList} setList={setAuthorList}/>
		</div>
	)
}