import React, { useState } from 'react'
import { AwardForm } from '../../parts/index/award_form';
import { AwardTable } from '../../parts/index/award_table';
import { useCommonModal } from '@/context/modal_context';
import { AwardSearch } from '@/components/parts/index/award_search';
import { Awards } from '@/types/award';

export const AwardPage = () => {
	const [awardList, setAwardList] = useState<Awards>([])
	const { showModal } = useCommonModal()

	return (
		<div className='p-4' >
			<div className='mb-4'>
				<button className='btn px-2 py-1' onClick={() => showModal(<AwardForm type='create' setList={setAwardList} />) }>追加</button>
				<button className='btn px-2 py-1' onClick={() => showModal(<AwardSearch setAwardList={setAwardList} />) }>検索</button>
			</div>
			<AwardTable list={awardList} setList={setAwardList}/>
		</div>
	)
}