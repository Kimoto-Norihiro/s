import React, { useState, useEffect } from 'react'
import { InternationalConferenceInfoTableDisplay, InternationalConferenceInfos,internationalConferencesToTableDisplays } from '@/types/international_conference_info'
import { listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


export const InternationalConferenceInfoTable = () => {
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])

	useEffect(() => {
		listInternationalConferenceInfos(setInternationalConferenceInfoList)
	}, [])

	const internationalConferenceInfoTableDisplayList = internationalConferencesToTableDisplays(internationalConferenceInfoList)

	const columns: ColumnDef<InternationalConferenceInfoTableDisplay, any>[] = [
		{ accessorKey: 'name', header: '会議名' },
		{ accessorKey: 'short_name', header: '略称名' },
		{ accessorKey: 'iso4_name', header: 'ISO4名' },
		{ accessorKey: 'collection_notation', header: '論文集' },
		{ accessorKey: 'publisher_name', header: '出版社名' },
	]
	const table = ({
		data: internationalConferenceInfoTableDisplayList,
		columns,
	}) as Table<InternationalConferenceInfoTableDisplay>

	return <MyTable table={table}/>
}