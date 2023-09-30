import { Table, flexRender } from '@tanstack/react-table'
import React from 'react'

type Props<T extends any> = {
	table: Table<T>
}

export const DisplayTable = <T extends any>({ table }: Props<T>) => {
	return (
		<table className='border-collapse border border-slate-300'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border border-slate-300 px-2 text-xs'>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
            
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='border border-slate-300 px-2 text-xs'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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