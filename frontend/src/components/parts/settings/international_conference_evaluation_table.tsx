import React, { useState, useEffect } from 'react'
import { InternationalConferenceEvaluations, internationalConferenceEvaluationsToTableDisplays, InternationalConferenceEvaluationTableDisplay } from '@/types/international_conference_evaluation'
import { listInternationalConferenceEvaluations } from '@/handlers/international_conference_evaluation_handlers'
import { MyTable, Table, ColumnDef } from '../table/MyTable';


export const InternationalConferenceEvaluationTable = () => {
	const [internationalConferenceEvaluationList, setInternationalConferenceEvaluationList] = useState<InternationalConferenceEvaluations>([])

	useEffect(() => {
		listInternationalConferenceEvaluations(setInternationalConferenceEvaluationList)
	}, [])

	const authorTableDisplayList = internationalConferenceEvaluationsToTableDisplays(internationalConferenceEvaluationList)
	const columns: ColumnDef<InternationalConferenceEvaluationTableDisplay, any>[] = [
		{ accessorKey: 'international_conference_info_name', header: '雑誌名' },
		{ accessorKey: 'year', header: '年' },
		{ accessorKey: 'core_rank', header: 'CORE Rank' },
		{ accessorKey: 'qualis', header: 'Qualis' },
		{ accessorKey: 'rank_guide2research', header: 'Rank guide2research' },
		{ accessorKey: 'acceptance_rate', header: '採択率' },
		{ accessorKey: 'number_of_submitted_papers', header: '投稿数' },
		{ accessorKey: 'number_of_accepted_papers', header: '採択数' },
	]
	const table = ({
		data: authorTableDisplayList,
		columns,
	}) as Table<InternationalConferenceEvaluationTableDisplay>

	return <MyTable table={table}/>
}