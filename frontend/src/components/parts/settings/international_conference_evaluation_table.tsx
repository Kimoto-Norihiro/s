import React, { useState, useEffect } from 'react'
import { InternationalConferenceEvaluations, internationalConferenceEvaluationsToTableDisplays, InternationalConferenceEvaluationTableDisplay } from '@/types/international_conference_evaluation'
import { DeleteInternationalConferenceEvaluation, getInternationalConferenceEvaluation, listInternationalConferenceEvaluations } from '@/handlers/international_conference_evaluation_handlers'
import { ColumnDef } from '../table/MyTable';
import { useCommonModal } from '@/context/modal_context';
import { InternationalConferenceEvaluationForm } from './international_conference_evaluation_form';
import { DeleteModal } from '../table/DeleteModal';

export const InternationalConferenceEvaluationTable = () => {
	const [internationalConferenceEvaluationList, setInternationalConferenceEvaluationList] = useState<InternationalConferenceEvaluations>([])

	const { showModal, closeModal } = useCommonModal()

	useEffect(() => {
		listInternationalConferenceEvaluations(setInternationalConferenceEvaluationList)
	}, [])

	const data = internationalConferenceEvaluationsToTableDisplays(internationalConferenceEvaluationList)
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
									const defaultValues = await getInternationalConferenceEvaluation(d.international_conference_info_id, d.year)
									console.log(defaultValues)
									if (!defaultValues) return
									showModal(<InternationalConferenceEvaluationForm type='update' defaultValues={defaultValues}/>)
								}}
							>
								編集
							</button>
							<button
								className='px-2 btn'
								onClick={async () => {
									const deleteHandler = async () => {
										await DeleteInternationalConferenceEvaluation(d.international_conference_info_id, d.year)
										closeModal()
										listInternationalConferenceEvaluations(setInternationalConferenceEvaluationList)
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