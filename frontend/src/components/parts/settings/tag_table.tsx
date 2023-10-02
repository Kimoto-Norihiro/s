import React, { useState, useEffect } from 'react'
import { Tags, TagTableDisplay, tagsToTableDisplays } from '@/types/tag'
import { listTags } from '@/handlers/tag_handlers';
import { MyTable, Table, ColumnDef } from '../table/MyTable';

export const TagTable = () => {
	const [tagList, setTagList] = useState<Tags>([])

	useEffect(() => {
		listTags(setTagList)
	}, [])

	const tagTableDisplayList = tagsToTableDisplays(tagList)
	const columns: ColumnDef<TagTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '分野タグ名',
		},
	]
	const table = ({
		data: tagTableDisplayList,
		columns,
	}) as Table<TagTableDisplay>

	return <MyTable table={table}/>
}