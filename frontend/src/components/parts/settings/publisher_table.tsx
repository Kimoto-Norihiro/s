import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Publishers, PublisherTableDisplay, publishersToTableDisplays } from '@/types/publisher'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'

export const PublisherTable = () => {
	const [publisherList, setPublisherList] = useState<Publishers>([])
	const indexPublisher = async () => {
		try {
			const res = await axios.get('http://localhost:8080/publishers', {
				withCredentials: true
			})
			setPublisherList(res.data)
			console.log('indexPublisher',res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		indexPublisher()
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