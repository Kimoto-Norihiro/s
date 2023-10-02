import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { DomesticConferenceInfoTableDisplay, DomesticConferenceInfos,domesticConferencesToTableDisplays } from '@/types/domestic_conference_info'
import { listDomesticConferenceInfos } from '@/handlers/domestic_conference_info_handlers'
import {  } from '@/types/domestic_conference_info'

export const DomesticConferenceInfoTable = () => {
	const [domesticConferenceInfoList, setDomesticConferenceInfoList] = useState<DomesticConferenceInfos>([])

	useEffect(() => {
		listDomesticConferenceInfos(setDomesticConferenceInfoList)
	}, [])

	const domesticConferenceInfoTableDisplayList = domesticConferencesToTableDisplays(domesticConferenceInfoList)

	const columns: ColumnDef<DomesticConferenceInfoTableDisplay, any>[] = [
		{ accessorKey: 'name', header: '会議名' },
		{ accessorKey: 'short_name', header: '略称名' },
		{ accessorKey: 'other_name', header: '別名' },
		{ accessorKey: 'collection_notation', header: '論文集' },
		{ accessorKey: 'publisher_name', header: '出版社名' },
	]
	const table = useReactTable<DomesticConferenceInfoTableDisplay>({
    data: domesticConferenceInfoTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}