import React, { useState, useEffect } from 'react'
import { Journal, JournalTableDisplay, Journals, JournalsToTableDisplays } from '@/types/journal'
import { deleteJournal, getJournalById, listJournals } from '@/handlers/journal_handlers'
import { ColumnDef } from '../table/MyTable';
import { JournalForm } from './journal_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';

export const JournalTable = ({ list, setList }: TableProps<Journal>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listJournals(setList)
	}, [])

	const data = JournalsToTableDisplays(list)

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

	return (
		<table className='border-collapse border border-slate-300'>
			<thead>
				<tr>
					{columns.map((column, idx) => (
						<th key={idx} className='border border-slate-300 px-2 text-xs'>
							{ column.header }
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((d, idx) => (
					<tr key={idx}>
						{columns.map((column, idx) => (
							<td key={idx} className='border border-slate-300 px-2 text-xs'>
								{ String(d[column.accessorKey]) }
							</td>
						))}
						<td className='border border-slate-300 px-4'>
							<button
								className='px-2 btn'
								onClick={async () => {
									const defaultValues = await getJournalById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<JournalForm type='update' defaultValues={defaultValues} setList={setList}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteJournal(d.id)
										closeModal()
										listJournals(setList)
									} 
									showModal(<DeleteModal deleteHandler={deleteHandler}/>)
								}}
							>
								削除
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}