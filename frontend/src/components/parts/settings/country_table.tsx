import React, { useState, useEffect } from 'react'
import { Countries, CountryTableDisplay } from '@/types/country'
import { listCountries } from '@/handlers/country_handlers'
import { countriesToTableDisplays } from '@/types/country'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


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
	const table = ({
		data: countryTableDisplayList,
		columns
	}) as Table<CountryTableDisplay>

	return <MyTable table={table}/>
}