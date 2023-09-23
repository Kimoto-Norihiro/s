import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Publishers, PublisherTableDisplay } from '@/types/types'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { publishersToTableDisplays } from '../../types/types';

export const PublisherTable = () => {
	const [publisherList, setPublisherList] = useState<Publishers>([])
	const indexPublisher = async () => {
		try {
			const res = await axios.get('http://localhost:8080/publishers', {
				withCredentials: true
			})
			setPublisherList(res.data)
			console.log('indexPublisher',res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		indexPublisher()
	}, [])

	const publisherTableDisplayList = publishersToTableDisplays(publisherList)
	const columns: ColumnDef<PublisherTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '出版社名',
		},
		{
			accessorKey: 'short_name',
			header: '省略名',
		},
	]
	const table = useReactTable<PublisherTableDisplay>({
    data: publisherTableDisplayList,
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