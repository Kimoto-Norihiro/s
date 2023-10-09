import React from 'react'
import { OrganizationForm } from '../../parts/settings/organization_form';
import { OrganizationTable } from '@/components/parts/settings/organization_table';
import { useCommonModal } from '@/context/modal_context';

export const AwardOrganizationPage = () => {
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<OrganizationForm type='create' />) }>追加</button>
			</div>
			<OrganizationTable />
		</div>
	)
}