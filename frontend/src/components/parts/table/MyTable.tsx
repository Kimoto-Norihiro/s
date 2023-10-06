import { useCommonModal } from '@/context/modal_context'
import React from 'react'

export type ColumnDef<T extends any, U extends any> = {
	accessorKey: keyof T
	header: U
}

export type Table<T extends any> = {
	data: T[]
	columns: ColumnDef<T, any>[]
}

type Props<T extends any> = {
	table: Table<T>
	setObject?: React.Dispatch<React.SetStateAction<T>>
	modal?: React.ReactNode
}

export const MyTable = <T extends any>({ table, modal, setObject }: Props<T>) => {
	const { data, columns } = table
	const { showModal } = useCommonModal()

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
								onClick={() => {
									showModal(modal)
								}}
              >
                編集
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
	)
}