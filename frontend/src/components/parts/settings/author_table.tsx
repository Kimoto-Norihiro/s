import React, { useState, useEffect } from 'react'
import { Authors, authorsToTableDisplays, AuthorTableDisplay } from '@/types/author'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { IndexAuthor } from '@/handlers/author_handlers'
import { DisplayTable } from '../table/DisplayTable'

export const AuthorTable = () => {
	const [authorList, setAuthorList] = useState<Authors>([])

	useEffect(() => {
		IndexAuthor(setAuthorList)
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
	const table = useReactTable<AuthorTableDisplay>({
    data: authorTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}