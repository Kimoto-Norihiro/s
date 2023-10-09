import React, { useState, useEffect } from 'react'
import { JournalEvaluation, JournalEvaluations, journalEvaluationsToTableDisplays, JournalEvaluationTableDisplay } from '@/types/journal_evaluation'
import { listJournalEvaluations, deleteJournalEvaluation, getJournalEvaluation } from '@/handlers/journal_evaluation_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { useCommonModal } from '@/context/modal_context';
import { JournalEvaluationForm } from './journal_evaluation_form';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';


export const JournalEvaluationTable = ({ list, setList }: TableProps<JournalEvaluation>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listJournalEvaluations(setList)
	}, [])

	const data = journalEvaluationsToTableDisplays(list)
	const columns: ColumnDef<JournalEvaluationTableDisplay, any>[] = [
		{ accessorKey: 'journal_info_name', header: '雑誌名' },
		{	accessorKey: 'year', header: '年' },
		{ accessorKey: 'if', header: 'IF' },
		{ accessorKey: 'acceptance_rate', header: '採択率' },
		{ accessorKey: 'number_of_submitted_papers', header: '投稿数' },
		{ accessorKey: 'number_of_accepted_papers', header: '採択数' }
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
									const defaultValues = await getJournalEvaluation(d.journal_info_id, d.year)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<JournalEvaluationForm type='update' defaultValues={defaultValues} setList={setList} />)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteJournalEvaluation(d.journal_info_id, d.year)
										closeModal()
										listJournalEvaluations(setList)
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