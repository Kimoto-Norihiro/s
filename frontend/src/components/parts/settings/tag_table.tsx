import React, { useState, useEffect } from 'react'
import { Tags, TagTableDisplay, tagsToTableDisplays } from '@/types/tag'
import { deleteTag, getTagById, listTags } from '@/handlers/tag_handlers';
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { TagForm } from './tag_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';

export const TagTable = () => {
	const [tagList, setTagList] = useState<Tags>([])
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listTags(setTagList)
	}, [])

	const data = tagsToTableDisplays(tagList)
	const columns: ColumnDef<TagTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '分野タグ名',
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
									const defaultValues = await getTagById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<TagForm type='update' defaultValues={defaultValues}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteTag(d.id)
										closeModal()
										listTags(setTagList)
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