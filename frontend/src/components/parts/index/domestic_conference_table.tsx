import React, { useState, useEffect } from 'react'
import { DomesticConferenceTableDisplay, DomesticConference, DomesticConferencesToTableDisplays } from '@/types/domestic_conference'
import { deleteDomesticConference, getDomesticConferenceById, listDomesticConferences } from '@/handlers/domestic_conference_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';
import { DomesticConferenceForm } from './domestic_conference_form';
import { useCommonModal } from '@/context/modal_context';
import { DeleteModal } from '../table/DeleteModal';
import { TableProps } from '@/types/table';

export const DomesticConferenceTable = ({list, setList}: TableProps<DomesticConference>) => {
	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listDomesticConferences(setList)
	}, [])

	const data = DomesticConferencesToTableDisplays(list)
	const columns: ColumnDef<DomesticConferenceTableDisplay, any>[] = [
		{ accessorKey: 'id', header: 'ID'},
		{ accessorKey: 'authors_name', header: '著者_正式'},
		{ accessorKey: 'authors_name_short', header: '著者_略記'},
		{ accessorKey: 'title', header: '題目'},
		{ accessorKey: 'domestic_conference_info_name', header: '会議名'},
		{ accessorKey: 'domestic_conference_info_name_other', header: '会議名_別名'},
		{ accessorKey: 'domestic_conference_info_name_short', header: '会議名_略記'},
		{ accessorKey: 'page', header: 'ページ'},
		{ accessorKey: 'year', header: '年'},
		{ accessorKey: 'url1', header: 'URL1'},
		{ accessorKey: 'url2', header: 'URL2'},
		{ accessorKey: 'doi', header: 'DOI'},
		{ accessorKey: 'is_joint_research', header: '共同研究'},
		{ accessorKey: 'venue', header: '会場'},
		{ accessorKey: 'city', header: '都市'},
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
									const defaultValues = await getDomesticConferenceById(d.id)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<DomesticConferenceForm type='update' defaultValues={defaultValues} setList={setList}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await deleteDomesticConference(d.id)
										closeModal()
										listDomesticConferences(setList)
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