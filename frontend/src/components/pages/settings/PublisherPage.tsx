import React, { useState } from 'react'
import { PublisherForm } from '../../parts/settings/publisher_form';
import { PublisherTable } from '../../parts/settings/publisher_table';
import { useCommonModal } from '@/context/modal_context';
import { Publishers } from '@/types/publisher';

export const PublisherPage = () => {
	const [publisherList, setPublisherList] = useState<Publishers>([])
	const { showModal } = useCommonModal()

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<PublisherForm type='create' setList={setPublisherList} />) }>追加</button>
			</div>
			<PublisherTable list={publisherList} setList={setPublisherList} />
		</div>
	)
}