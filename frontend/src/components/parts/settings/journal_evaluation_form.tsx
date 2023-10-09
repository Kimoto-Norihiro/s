import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { JournalEvaluation } from '@/types/journal_evaluation'
import { createJournalEvaluation, listJournalEvaluations } from '@/handlers/journal_evaluation_handlers'
import { JournalInfos } from '@/types/journal_info'
import { listJournalInfos } from '@/handlers/journal_info_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'

const currentYear = new Date().getFullYear()

const JournalEvaluationUpsertSchema = yup.object().shape({
	journal_info: yup.object().required('選択してください'),
	year: yup.number().required('選択してください'),
	if: yup.number().required('入力してください'),
	acceptance_rate: yup.number().required('入力してください'),
	number_of_submitted_papers: yup.number().required('入力してください'),
	number_of_accepted_papers: yup.number().required('入力してください'),
})

export const JournalEvaluationForm = ({ type, defaultValues, setList }: FormProps<JournalEvaluation>) => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<JournalEvaluation>({
		resolver: yupResolver(JournalEvaluationUpsertSchema),
		defaultValues
	})
	const { closeModal } = useCommonModal()
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createJournalEvaluation(data)
			} else {
				await createJournalEvaluation(data)
			}
			listJournalEvaluations(setList)
			closeModal()
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listJournalInfos(setJournalInfoList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={submit}
			>
				<SelectWithError
					label='雑誌名'
					name='journal_info'
					control={control}
					errors={errors}
					required
					options={journalInfoList.map((journal_info) => {
						return {
							value: journal_info.id,
							label: `${journal_info.name}`
						}
					})}
					list={journalInfoList}
				/>
				<SelectWithError
					label='年'
					name='year'
					control={control}
					errors={errors}
					options={Array.from(Array(200).keys()).map((year) => {
						return {
							value: currentYear - year,
							label: `${currentYear - year}`
						}
					})}
				/>
				<InputWithError 
					label='IF'
					name='if'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='採択率'
					name='acceptance_rate'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='投稿数'
					name='number_of_submitted_papers'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='採択数'
					name='number_of_accepted_papers'
					register={register}
					errors={errors}
					required
				/>
				<FormButton />
			</form>
		</div>
	)
}