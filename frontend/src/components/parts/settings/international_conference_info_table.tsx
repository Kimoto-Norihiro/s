import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { InternationalConferenceInfoTableDisplay, InternationalConferenceInfos,internationalConferencesToTableDisplays } from '@/types/international_conference_info'
import { listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers'
import {  } from '@/types/international_conference_info'

export const InternationalConferenceInfoTable = () => {
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])

	useEffect(() => {
		listInternationalConferenceInfos(setInternationalConferenceInfoList)
	}, [])

	const internationalConferenceInfoTableDisplayList = internationalConferencesToTableDisplays(internationalConferenceInfoList)

	const columns: ColumnDef<InternationalConferenceInfoTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '会議名',
		},
		{
			accessorKey: 'short_name',
			header: '省略名',
		},
		{
			accessorKey: 'iso4_name',
			header: 'ISO4名',
		},
		{
			accessorKey: 'publisher_name',
			header: '出版社名',
		},
	]
	const table = useReactTable<InternationalConferenceInfoTableDisplay>({
    data: internationalConferenceInfoTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}