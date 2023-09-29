import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { JournalInfoTableDisplay, JournalInfos, journalInfosToTableDisplays } from '@/types/journal_info'
import { DisplayTable } from '../table/DisplayTable'
import { listJournalInfos } from '@/handlers/journal_info_handlers'

export const JournalInfoTable = () => {
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])

	useEffect(() => {
		listJournalInfos(setJournalInfoList)
	}, [])

	const journalInfoTableDisplayList = journalInfosToTableDisplays(journalInfoList)
	const columns: ColumnDef<JournalInfoTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '雑誌名',
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
		},
	]
	const table = useReactTable<JournalInfoTableDisplay>({
    data: journalInfoTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}