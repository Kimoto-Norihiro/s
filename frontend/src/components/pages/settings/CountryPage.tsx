import React from 'react'
import { CountryForm } from '../../parts/settings/country_form';
import { CountryTable } from '../../parts/settings/country_table';
import { useCommonModal } from '@/context/modal_context';

export const CountryPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<CountryForm/>) }>追加</button>
			</div>
			<CountryTable />
		</div>
	)
}