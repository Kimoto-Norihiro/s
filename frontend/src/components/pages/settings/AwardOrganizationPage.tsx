import React from 'react'
import { OrganizationForm } from '../../parts/settings/organaization_form';
import { OrganizationTable } from '@/components/parts/settings/organization_table';

export const AwardOrganizationPage = () => {
	return (
		<div className='p-4'>
			<OrganizationForm />
			<OrganizationTable />
		</div>
	)
}