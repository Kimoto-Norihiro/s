import React, { useState, useEffect } from 'react'
import { Author, Authors, authorsToTableDisplays, AuthorTableDisplay } from '@/types/author'
import { deleteAuthor, getAuthorById, listAuthors } from '@/handlers/author_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { AuthorForm } from './author_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';

export const AuthorTable = () => {
	const [authorList, setAuthorList] = useState<Authors>([])
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listAuthors(setAuthorList)
	}, [])

	const data = authorsToTableDisplays(authorList)
	const columns: ColumnDef<AuthorTableDisplay, any>[] = [
		{ accessorKey: 'ja_name', header: '日本語表記' },
		{ accessorKey: 'en_name', header: '英語表記' },
	]

	return (
		<table className='border-collapse border border-slate-300'>
      <thead>
				<tr>
					{columns.map((column, idx) => (
						<th key={idx} className='border border-slate-300 px-2 text-xs'>
							{ column.header }
						</th>
					))}
				</tr>
      </thead>
      <tbody>
        {data.map((d, idx) => (
          <tr key={idx}>
            {columns.map((column, idx) => (
							<td key={idx} className='border border-slate-300 px-2 text-xs'>
								{ String(d[column.accessorKey]) }
							</td>
						))}
            <td className='border border-slate-300 px-4'>
              <button
                className='px-2 btn'
								onClick={async () => {
									const defaultValues = await getAuthorById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<AuthorForm type='update' defaultValues={defaultValues}/>)
								}}
              >
                編集
              </button>
							<button
                className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteAuthor(d.id)
										closeModal()
										listAuthors(setAuthorList)
									} 
									showModal(<DeleteModal deleteHandler={deleteHandler}/>)
								}}
              >
                削除
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
	)
}