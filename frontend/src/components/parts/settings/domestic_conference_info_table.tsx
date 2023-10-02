import React, { useState, useEffect } from 'react'
import { DomesticConferenceInfoTableDisplay, DomesticConferenceInfos,domesticConferencesToTableDisplays } from '@/types/domestic_conference_info'
import { listDomesticConferenceInfos } from '@/handlers/domestic_conference_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';

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
	const table = ({
		data: domesticConferenceInfoTableDisplayList,
		columns,
	}) as Table<DomesticConferenceInfoTableDisplay>

	return <MyTable table={table}/>
}