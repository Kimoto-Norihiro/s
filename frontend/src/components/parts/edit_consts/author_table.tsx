import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Authors, authorsToTableDisplays, AuthorTableDisplay } from '@/types/types'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { IndexAuthor } from '@/handlers/author_handlers'

export const AuthorTable = () => {
	const [authorList, setAuthorList] = useState<Authors>([])

	useEffect(() => {
		IndexAuthor().then((res) => {
      if (res.status !== 200) {
        console.log('error')
        return
      }
      setAuthorList(res.data)
    })
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

	return (
    <table className='border-collapse border border-slate-400'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border border-slate-300 px-4'>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='border border-slate-300 px-4'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
	)
}