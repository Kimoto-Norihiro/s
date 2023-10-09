import React, { useState } from 'react'
import { TagForm } from '../../parts/settings/tag_form';
import { TagTable } from '../../parts/settings/tag_table';
import { useCommonModal } from '@/context/modal_context';
import { Tags } from '@/types/tag';

export const TagPage = () => {
	const [tagList, setTagList] = useState<Tags>([])
	const { showModal } = useCommonModal()
	return (
		<div className='p-4'>
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<TagForm type='create' setList={setTagList} />) }>追加</button>
			</div>
			<TagTable list={tagList} setList={setTagList}/>
		</div>
	)
}