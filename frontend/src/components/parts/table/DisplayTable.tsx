import { Table, flexRender } from '@tanstack/react-table'
import React from 'react'

type Props<T extends any> = {
	table: Table<T>
}

export const DisplayTable = <T extends any>({ table }: Props<T>) => {
	return (
		<table className='border-collapse border border-slate-400'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border border-slate-300 px-4'>
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
              <td key={cell.id} className='border border-slate-300 px-4'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
	)
}