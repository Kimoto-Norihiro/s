import React, { useState } from 'react'
import { InternationalConferenceInfoForm } from '../../parts/settings/international_conference_Info_form';
import { InternationalConferenceInfoTable } from '@/components/parts/settings/international_conference_info_table';
import { useCommonModal } from '@/context/modal_context';
import { InternationalConferenceInfos } from '@/types/international_conference_info';

export const InternationalConferenceInfoPage = () => {
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<InternationalConferenceInfoForm type='create' setList={setInternationalConferenceInfoList} />) }>追加</button>
			</div>
			<InternationalConferenceInfoTable list={internationalConferenceInfoList} setList={setInternationalConferenceInfoList} />
		</div>
	)
}