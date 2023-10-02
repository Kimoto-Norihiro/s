import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DisplayTable } from '../table/DisplayTable'
import { Organizations, OrganizationTableDisplay } from '@/types/organization'
import { listOrganizations } from '@/handlers/organization_handlers'
import { organizationsToTableDisplays } from '@/types/organization'

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
	const table = useReactTable<OrganizationTableDisplay>({
    data: organizationTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}