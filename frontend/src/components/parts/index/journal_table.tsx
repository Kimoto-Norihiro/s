import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { JournalTableDisplay, Journals, JournalsToTableDisplays } from '@/types/journal'
import { listJournals } from '@/handlers/journal_handlers'

export const JournalTable = () => {
	const [journalList, setJournalList] = useState<Journals>([])

	useEffect(() => {
		listJournals(setJournalList)
	}, [])

	const journalTableDisplayList = JournalsToTableDisplays(journalList)

	const columns: ColumnDef<JournalTableDisplay, any>[] = [
		{ accessorKey: 'id', header: 'ID'},
		{ accessorKey: 'authors_name', header: '著者_正式'},
		{ accessorKey: 'authors_name_short', header: '著者_略記'},
		{ accessorKey: 'title', header: '題目'},
		{ accessorKey: 'journal_info_name', header: '雑誌名'},
		{ accessorKey: 'journal_info_name_iso4', header: '雑誌名_ISO4'},
		{ accessorKey: 'journal_info_name_short', header: '雑誌名_略記'},
		{ accessorKey: 'volume_str', header: '巻_文字列'},
		{ accessorKey: 'number_str', header: '号_文字列'},
		{ accessorKey: 'page', header: 'ページ'},
		{ accessorKey: 'year', header: '年'},
		{ accessorKey: 'url1', header: 'URL1'},
		{ accessorKey: 'url2', header: 'URL2'},
		{ accessorKey: 'doi', header: 'DOI'},
		{ accessorKey: 'is_joint_research', header: '共同研究'},
		{ accessorKey: 'evaluation_if', header: 'IF'},
		{ accessorKey: 'evaluation_acceptance_rate', header: '採択率'},
		{ accessorKey: 'peer_review_course', header: '査読課程'},
		{ accessorKey: 'is_manuscript_exist', header: '原稿'},
		{ accessorKey: 'is_appendix_exist', header: '付録'},
		{ accessorKey: 'tag_names', header: '分野タグ'},
	]
	const table = useReactTable<JournalTableDisplay>({
    data: journalTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}