import React, { useState, useEffect } from 'react'
import { InternationalConferenceTableDisplay, InternationalConferences, InternationalConferencesToTableDisplays } from '@/types/international_conference'
import { listInternationalConferences } from '@/handlers/international_conference_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


export const InternationalConferenceTable = () => {
	const [internationalConferenceList, setInternationalConferenceList] = useState<InternationalConferences>([])

	useEffect(() => {
		listInternationalConferences(setInternationalConferenceList)
	}, [])

	const internationalConferenceTableDisplayList = InternationalConferencesToTableDisplays(internationalConferenceList)

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
	
	const table = ({
		data: internationalConferenceTableDisplayList,
		columns,
	}) as Table<InternationalConferenceTableDisplay>

	return <MyTable table={table}/>
}