import React, { useState, useEffect } from 'react'
import { InternationalConferenceTableDisplay, InternationalConference, InternationalConferencesToTableDisplays } from '@/types/international_conference'
import { deleteInternationalConference, getInternationalConferenceById, listInternationalConferences } from '@/handlers/international_conference_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { InternationalConferenceForm } from './international_conference_form';
import { TableProps } from '@/types/table';

export const InternationalConferenceTable = ({ list, setList }: TableProps<InternationalConference>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listInternationalConferences(setList)
	}, [])

	const data = InternationalConferencesToTableDisplays(list)

	const columns: ColumnDef<InternationalConferenceTableDisplay, any>[] = [
		{ accessorKey: 'id', header: 'ID'},
		{ accessorKey: 'authors_name', header: '著者_正式'},
		{ accessorKey: 'authors_name_short', header: '著者_略記'},
		{ accessorKey: 'title', header: '題目'},
		{ accessorKey: 'international_conference_info_name', header: '会議名'},
		{ accessorKey: 'international_conference_info_name_iso4', header: '会議名_ISO4'},
		{ accessorKey: 'international_conference_info_name_short', header: '会議名_略記'},
		{ accessorKey: 'page', header: 'ページ'},
		{ accessorKey: 'year', header: '年'},
		{ accessorKey: 'url1', header: 'URL1'},
		{ accessorKey: 'url2', header: 'URL2'},
		{ accessorKey: 'doi', header: 'DOI'},
		{ accessorKey: 'is_joint_research', header: '共同研究'},
		{ accessorKey: 'venue', header: '会場'},
		{ accessorKey: 'city', header: '都市'},
		{ accessorKey: 'country_name', header: '国'},
		{ accessorKey: 'evaluation_core_rank', header: 'CORE Rank'},
		{ accessorKey: 'evaluation_qualis', header: 'Qualis'},
		{ accessorKey: 'evaluation_rank_guide2research', header: 'Ranking Guide to Research'},
		{ accessorKey: 'evaluation_acceptance_rate', header: '採択率'},
		{ accessorKey: 'peer_review_course', header: '査読課程'},
		{ accessorKey: 'is_manuscript_exist', header: '原稿'},
		{ accessorKey: 'is_slide_pdf_exist', header: 'スライドPDF'},
		{ accessorKey: 'is_slide_ppt_exist', header: 'スライドPPT'},
		{ accessorKey: 'is_poster_exist', header: 'ポスター'},
		{ accessorKey: 'is_video_exist', header: 'ビデオ'},
		{ accessorKey: 'tag_names', header: '分野タグ'},
	]

	return (
		<table className='border-collapse border border-slate-300'>
			<thead>
				<tr>
					{columns.map((column, idx) => (
						<th key={idx} className='border border-slate-300 px-2 text-xs'>
							{ column.header }
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((d, idx) => (
					<tr key={idx}>
						{columns.map((column, idx) => (
							<td key={idx} className='border border-slate-300 px-2 text-xs'>
								{ String(d[column.accessorKey]) }
							</td>
						))}
						<td className='border border-slate-300 px-4'>
							<button
								className='px-2 btn'
								onClick={async () => {
									const defaultValues = await getInternationalConferenceById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<InternationalConferenceForm type='update' defaultValues={defaultValues} setList={setList}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteInternationalConference(d.id)
										closeModal()
										listInternationalConferences(setList)
									} 
									showModal(<DeleteModal deleteHandler={deleteHandler}/>)
								}}
							>
								削除
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}