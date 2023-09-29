import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tags, TagTableDisplay, tagsToTableDisplays } from '@/types/tag'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable';
import { listTags } from '@/handlers/tag_handlers';

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
	const table = useReactTable<TagTableDisplay>({
    data: tagTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}