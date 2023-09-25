import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tags, TagTableDisplay, tagsToTableDisplays } from '@/types/tag'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable';

export const TagTable = () => {
	const [tagList, setTagList] = useState<Tags>([])
	const indexTag = async () => {
		try {
			const res = await axios.get('http://localhost:8000/tags', {
				withCredentials: true
			})
			setTagList(res.data)
			console.log('indexTag',res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		indexTag()
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