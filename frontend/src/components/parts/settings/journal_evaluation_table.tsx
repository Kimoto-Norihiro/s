import React, { useState, useEffect } from 'react'
import { JournalEvaluations, journalEvaluationsToTableDisplays, JournalEvaluationTableDisplay } from '@/types/journal_evaluation'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ListJournalEvaluations } from '@/handlers/journal_evaluation_handlers'
import { DisplayTable } from '../table/DisplayTable'

export const JournalEvaluationTable = () => {
	const [journalEvaluationList, setJournalEvaluationList] = useState<JournalEvaluations>([])

	useEffect(() => {
		ListJournalEvaluations(setJournalEvaluationList)
		console.log('journalEvaluationList',journalEvaluationList)
	}, [])

	const authorTableDisplayList = journalEvaluationsToTableDisplays(journalEvaluationList)
	const columns: ColumnDef<JournalEvaluationTableDisplay, any>[] = [
		{
			accessorKey: 'journal_info_name',
			header: '雑誌名',
		},
		{
			accessorKey: 'year',
			header: '年',
		},
		{
			accessorKey: 'if',
			header: 'IF',
		},
		{
			accessorKey: 'acceptance_rate',
			header: '採択率',
		},
		{
			accessorKey: 'number_of_submitted_papers',
			header: '投稿数',
		},
		{
			accessorKey: 'number_of_accepted_papers',
			header: '採択数',
		},
	]
	const table = useReactTable<JournalEvaluationTableDisplay>({
    data: authorTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}