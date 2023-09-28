import React, { useState, useEffect } from 'react'
import { Publishers, PublisherTableDisplay, publishersToTableDisplays } from '@/types/publisher'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { listPublishers } from '@/handlers/publisher_handlers'

export const PublisherTable = () => {
	const [publisherList, setPublisherList] = useState<Publishers>([])

	useEffect(() => {
		listPublishers(setPublisherList)
	}, [])

	const publisherTableDisplayList = publishersToTableDisplays(publisherList)
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
	const table = useReactTable<PublisherTableDisplay>({
    data: publisherTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}