import React, { useState } from 'react'
import { CountryForm } from '../../parts/settings/country_form';
import { CountryTable } from '../../parts/settings/country_table';
import { useCommonModal } from '@/context/modal_context';
import { Countries } from '@/types/country';

export const CountryPage = () => {
	const [countryList, setCountryList] = useState<Countries>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<CountryForm type='create' setList={setCountryList} />) }>追加</button>
			</div>
			<CountryTable list={countryList} setList={setCountryList} />
		</div>
	)
}