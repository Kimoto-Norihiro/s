import React, { useState, useEffect } from 'react'
import { Organizations, OrganizationTableDisplay } from '@/types/organization'
import { deleteOrganization, getOrganizationById, listOrganizations } from '@/handlers/organization_handlers'
import { organizationsToTableDisplays } from '@/types/organization'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { OrganizationForm } from './organization_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';


export const OrganizationTable = () => {
	const [organizationList, setOrganizationList] = useState<Organizations>([])
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listOrganizations(setOrganizationList)
	}, [])

	const data = organizationsToTableDisplays(organizationList)
	const columns: ColumnDef<OrganizationTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '国名',
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
									const defaultValues = await getOrganizationById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<OrganizationForm type='update' defaultValues={defaultValues}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteOrganization(d.id)
										closeModal()
										listOrganizations(setOrganizationList)
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