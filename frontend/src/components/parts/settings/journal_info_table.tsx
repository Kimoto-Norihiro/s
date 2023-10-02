import React, { useState, useEffect } from 'react'
import { JournalInfoTableDisplay, JournalInfos, journalInfosToTableDisplays } from '@/types/journal_info'
import { listJournalInfos } from '@/handlers/journal_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


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
	const table = ({
		data: journalInfoTableDisplayList,
		columns,
	}) as Table<JournalInfoTableDisplay>

	return <MyTable table={table}/>
}