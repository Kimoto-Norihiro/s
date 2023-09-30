import React from 'react'
import { CountryForm } from '../../parts/settings/country_form';
import { CountryTable } from '../../parts/settings/country_table';

export const CountryPage = () => {
	return (
		<div className='p-4'>
			<CountryForm />
			<CountryTable />
		</div>
	)
}