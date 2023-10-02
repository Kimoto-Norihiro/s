import React, { useState, useEffect } from 'react'
import { Organizations, OrganizationTableDisplay } from '@/types/organization'
import { listOrganizations } from '@/handlers/organization_handlers'
import { organizationsToTableDisplays } from '@/types/organization'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


export const OrganizationTable = () => {
	const [organizationList, setOrganizationList] = useState<Organizations>([])

	useEffect(() => {
		listOrganizations(setOrganizationList)
	}, [])

	const organizationTableDisplayList = organizationsToTableDisplays(organizationList)

	const columns: ColumnDef<OrganizationTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '国名',
		},
	]
	const table = ({
    data: organizationTableDisplayList,
    columns
  }) as Table<OrganizationTableDisplay>

	return <MyTable table={table}/>
}