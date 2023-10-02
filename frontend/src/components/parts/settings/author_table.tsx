import React, { useState, useEffect } from 'react'
import { Authors, authorsToTableDisplays, AuthorTableDisplay } from '@/types/author'
import { listAuthors } from '@/handlers/author_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';

export const AuthorTable = () => {
	const [authorList, setAuthorList] = useState<Authors>([])

	useEffect(() => {
		listAuthors(setAuthorList)
	}, [])

	const authorTableDisplayList = authorsToTableDisplays(authorList)
	const columns: ColumnDef<AuthorTableDisplay, any>[] = [
		{
			accessorKey: 'ja_name',
			header: '日本語表記',
		},
		{
			accessorKey: 'en_name',
			header: '英語表記',
		},
	]
	const table = ({
		data: authorTableDisplayList,
		columns,
	}) as Table<AuthorTableDisplay>

	return <MyTable table={table}/>
}