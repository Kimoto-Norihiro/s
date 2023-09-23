import React, { useState, useEffect } from 'react'
import { ConferenceAndJournal, ConferenceAndJournalTableDisplay, conferenceAndJournalsToTableDisplays  } from '../../types/types';
import axios from 'axios'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

export const ConferenceAndJournalTable = () => {
	const [conferenceAndJournalList, setConferenceAndJournalList] = useState<ConferenceAndJournal[]>([])
	const indexConferenceAndJournal = async () => {
		try {
			const res = await axios.get('http://localhost:8080/conference_and_journals', {
				withCredentials: true
			})
			setConferenceAndJournalList(res.data)
			console.log('indexConferenceAndJournal',res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		indexConferenceAndJournal()
	}, [])

	const conferenceAndJournalTableDisplayList = conferenceAndJournalsToTableDisplays(conferenceAndJournalList)
	const columns: ColumnDef<ConferenceAndJournalTableDisplay, any>[] = [
		{
			accessorKey: 'paper_kind_name',
			header: '種類',
		},
		{
			accessorKey: 'name',
			header: '会議名,雑誌名',
		},
		{
			accessorKey: 'short_name',
			header: '省略名',
		},
		{
			accessorKey: 'iso4_name',
			header: 'ISO4名',
		},
		{
			accessorKey: 'publisher_name',
			header: '出版社名',
		}
	]
	const table = useReactTable<ConferenceAndJournalTableDisplay>({
    data: conferenceAndJournalTableDisplayList,
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