import React, { useState, useEffect } from 'react'
import { Authors, authorsToTableDisplays, AuthorTableDisplay } from '@/types/author'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { listAuthors } from '@/handlers/author_handlers'
import { DisplayTable } from '../table/DisplayTable'
import { Countries, CountryTableDisplay } from '@/types/country'
import { listCountries } from '@/handlers/country_handlers'
import { countriesToTableDisplays } from '@/types/country'

export const CountryTable = () => {
	const [countryList, setCountryList] = useState<Countries>([])

	useEffect(() => {
		listCountries(setCountryList)
	}, [])

	const countryTableDisplayList = countriesToTableDisplays(countryList)

	const columns: ColumnDef<CountryTableDisplay, any>[] = [
		{
			accessorKey: 'name',
			header: '国名',
		},
	]
	const table = useReactTable<CountryTableDisplay>({
    data: countryTableDisplayList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

	return <DisplayTable table={table}/>
}