import React, { useState, useEffect } from 'react'
import { InternationalConferenceInfoTableDisplay, InternationalConferenceInfo, internationalConferencesToTableDisplays } from '@/types/international_conference_info'
import { deleteInternationalConferenceInfo, getInternationalConferenceInfoById, listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { InternationalConferenceInfoForm } from './international_conference_Info_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';

export const InternationalConferenceInfoTable = ({ list, setList }: TableProps<InternationalConferenceInfo>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listInternationalConferenceInfos(setList)
	}, [])

	const data = internationalConferencesToTableDisplays(list)

	const columns: ColumnDef<InternationalConferenceInfoTableDisplay, any>[] = [
		{ accessorKey: 'name', header: '会議名' },
		{ accessorKey: 'short_name', header: '略称名' },
		{ accessorKey: 'iso4_name', header: 'ISO4名' },
		{ accessorKey: 'collection_notation', header: '論文集' },
		{ accessorKey: 'publisher_name', header: '出版社名' },
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
									const defaultValues = await getInternationalConferenceInfoById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<InternationalConferenceInfoForm type='update' defaultValues={defaultValues} setList={setList} />)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteInternationalConferenceInfo(d.id)
										closeModal()
										listInternationalConferenceInfos(setList)
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