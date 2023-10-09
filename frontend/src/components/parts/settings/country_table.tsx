import React, { useState, useEffect } from 'react'
import { Country, Countries } from '@/types/country'
import { deleteCountry, getCountryById, listCountries } from '@/handlers/country_handlers'
import { ColumnDef } from '../table/MyTable';
import { CountryForm } from './country_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';

export const CountryTable = ({ list, setList }: TableProps<Country>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listCountries(setList)
	}, [])

	const data = list
	const columns: ColumnDef<Country, any>[] = [
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
									const defaultValues = await getCountryById(d.id)
									if (!defaultValues) return
									showModal(<CountryForm type='update' defaultValues={defaultValues} setList={setList}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteCountry(d.id)
										closeModal()
										listCountries(setList)
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