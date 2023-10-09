import React, { useState, useEffect } from 'react'
import { JournalInfoTableDisplay, JournalInfos, journalInfosToTableDisplays } from '@/types/journal_info'
import { deleteJournalInfo, getJournalInfoById, listJournalInfos } from '@/handlers/journal_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { useCommonModal } from '@/context/modal_context';
import { JournalInfoForm } from './journal_info_form';
import { DeleteModal } from '../table/DeleteModal';


export const JournalInfoTable = () => {
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listJournalInfos(setJournalInfoList)
	}, [])

	const data = journalInfosToTableDisplays(journalInfoList)
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
									const defaultValues = await getJournalInfoById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<JournalInfoForm type='update' defaultValues={defaultValues}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteJournalInfo(d.id)
										closeModal()
										listJournalInfos(setJournalInfoList)
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