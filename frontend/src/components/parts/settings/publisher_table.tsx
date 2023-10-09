import React, { useState, useEffect } from 'react'
import { Publishers, PublisherTableDisplay, publishersToTableDisplays, Publisher } from '@/types/publisher'
import { deletePublisher, getPublisherById, listPublishers } from '@/handlers/publisher_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { PublisherForm } from './publisher_form';
import { DeleteModal } from '../table/DeleteModal';
import { useCommonModal } from '@/context/modal_context';
import { TableProps } from '@/types/table';

export const PublisherTable = ({ list, setList }: TableProps<Publisher>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listPublishers(setList)
	}, [])

	const data = publishersToTableDisplays(list)
	const columns: ColumnDef<PublisherTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '出版社名',
		},
		{
			accessorKey: 'short_name',
			header: '省略名',
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
									const defaultValues = await getPublisherById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<PublisherForm type='update' defaultValues={defaultValues} setList={setList} />)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deletePublisher(d.id)
										closeModal()
										listPublishers(setList)
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