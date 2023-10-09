import React, { useState, useEffect } from 'react'
import { DomesticConferenceInfoTableDisplay, DomesticConferenceInfo, domesticConferencesToTableDisplays } from '@/types/domestic_conference_info'
import { deleteDomesticConferenceInfo, getDomesticConferenceInfoById, listDomesticConferenceInfos } from '@/handlers/domestic_conference_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { DeleteModal } from '../table/DeleteModal';
import { useCommonModal } from '@/context/modal_context';
import { DomesticConferenceInfoForm } from './domestic_conference_Info_form';
import { TableProps } from '@/types/table';

export const DomesticConferenceInfoTable = ({ list, setList }: TableProps<DomesticConferenceInfo>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listDomesticConferenceInfos(setList)
	}, [])

	const data = domesticConferencesToTableDisplays(list)
	const columns: ColumnDef<DomesticConferenceInfoTableDisplay, any>[] = [
		{ accessorKey: 'name', header: '会議名' },
		{ accessorKey: 'short_name', header: '略称名' },
		{ accessorKey: 'other_name', header: '別名' },
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
									const defaultValues = await getDomesticConferenceInfoById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<DomesticConferenceInfoForm type='update' defaultValues={defaultValues} setList={setList} />)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteDomesticConferenceInfo(d.id)
										closeModal()
										listDomesticConferenceInfos(setList)
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