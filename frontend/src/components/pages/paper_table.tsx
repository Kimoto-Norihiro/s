import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Papers, PaperTableDisplay, papersToTableDisplays } from '@/types/types'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

export const PaperTable = () => {
	const [paperList, setPaperList] = useState<Papers>([])
	const indexPaper = async () => {
		try {
			const res = await axios.get('http://localhost:8080/papers', {
				withCredentials: true
			})
			setPaperList(res.data)
			console.log('indexPublisher',res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		indexPaper()
	}, [])

	useEffect(() => {
		console.log('paperList',paperList)
		console.log('paperTable',papersToTableDisplays(paperList))
	}, [paperList])

	const paperTableDisplayList = papersToTableDisplays(paperList)
	const columns: ColumnDef<PaperTableDisplay, any>[] = [
		{
			accessorKey: 'paper_kind_name',
			header: '種類',
		},
		{
			accessorKey: 'title',
			header: '題目',
		},
		{
			accessorKey: 'author_names',
			header: '著者',
		},
		{
			accessorKey: 'conference_and_journal_name',
			header: '会議名,雑誌名',
		},
		{
			accessorKey: 'year',
			header: '年',
		},
		{
			accessorKey: 'start_page',
			header: '開始ページ',
		},
		{
			accessorKey: 'end_page',
			header: '終了ページ',
		},
		{
			accessorKey: 'publisher_name',
			header: '出版社名',
		}
	]
	const table = useReactTable<PaperTableDisplay>({
    data: paperTableDisplayList,
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