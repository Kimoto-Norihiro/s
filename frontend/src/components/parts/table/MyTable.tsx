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
}

export const MyTable = <T extends any>({ table }: Props<T>) => {
	const { data, columns } = table

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
                className='bg-black text-white px-2 rounded hover:bg-white hover:text-black hover: border border-black'
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