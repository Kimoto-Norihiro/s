import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { AwardTableDisplay, Awards, AwardsToTableDisplays } from '@/types/award'
import { listAwards } from '@/handlers/award_handlers'

export const AwardTable = () => {
	const [domesticConferenceList, setAwardList] = useState<Awards>([])

	useEffect(() => {
		listAwards(setAwardList)
	}, [])

	const domesticConferenceTableDisplayList = AwardsToTableDisplays(domesticConferenceList)

	const columns: ColumnDef<AwardTableDisplay, any>[] = [
		{ accessorKey: 'id', header: 'ID'},
		{ accessorKey: 'authors_name', header: '著者_正式'},
		{ accessorKey: 'authors_name_short', header: '著者_略記'},
		{ accessorKey: 'title', header: '賞名'},
		{ accessorKey: 'organization_name', header: '表彰団体'},
		{ accessorKey: 'year', header: '年'},
		{ accessorKey: 'url1', header: 'URL1'},
		{ accessorKey: 'url2', header: 'URL2'},
		{ accessorKey: 'is_joint_research', header: '共同研究'},
		{ accessorKey: 'is_certificate_exist', header: '共同研究'},
		{ accessorKey: 'tag_names', header: '分野タグ'},
	]
	const table = useReactTable<AwardTableDisplay>({
    data: domesticConferenceTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}