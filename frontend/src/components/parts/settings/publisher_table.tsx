import React, { useState, useEffect } from 'react'
import { Publishers, PublisherTableDisplay, publishersToTableDisplays } from '@/types/publisher'
import { listPublishers } from '@/handlers/publisher_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


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
	const table = ({
    data: publisherTableDisplayList,
    columns,
  }) as Table<PublisherTableDisplay>

	return <MyTable table={table}/>
}