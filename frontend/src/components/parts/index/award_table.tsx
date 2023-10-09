import React, { useState, useEffect } from 'react'
import { Award, AwardTableDisplay, Awards, AwardsToTableDisplays } from '@/types/award'
import { deleteAward, getAwardById, listAwards } from '@/handlers/award_handlers'
import { ColumnDef } from '../table/MyTable';
import { AwardForm } from './award_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';

export const AwardTable = ({ list, setList }: TableProps<Award>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listAwards(setList)
	}, [])

	const data = AwardsToTableDisplays(list)
	const columns: ColumnDef<AwardTableDisplay, string>[] = [
		{ accessorKey: 'id', header: 'ID'},
		{ accessorKey: 'authors_name', header: '著者_正式'},
		{ accessorKey: 'authors_name_short', header: '著者_略記'},
		{ accessorKey: 'name', header: '賞名'},
		{ accessorKey: 'organization_name', header: '表彰団体'},
		{ accessorKey: 'year', header: '年'},
		{ accessorKey: 'url1', header: 'URL1'},
		{ accessorKey: 'url2', header: 'URL2'},
		{ accessorKey: 'is_joint_research', header: '共同研究'},
		{ accessorKey: 'is_certificate_exist', header: '共同研究'},
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
									const defaultValues = await getAwardById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<AwardForm type='update' defaultValues={defaultValues} setList={setList}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteAward(d.id)
										closeModal()
										listAwards(setList)
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