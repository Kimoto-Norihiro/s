import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { InternationalConferenceEvaluation } from '@/types/international_conference_evaluation'
import { InternationalConferenceInfos } from '@/types/international_conference_info'
import { listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers'
import { createInternationalConferenceEvaluation, listInternationalConferenceEvaluations, updateInternationalConferenceEvaluation } from '@/handlers/international_conference_evaluation_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'
import { internationalConferenceInfosToOptions } from '../../../types/international_conference_info';

const currentYear = new Date().getFullYear()

const InternationalConferenceEvaluationUpsertSchema = yup.object().shape({
	international_conference_info: yup.object().required('選択してください'),
	year: yup.number().required('選択してください'),
	if: yup.number().required('入力してください'),
	acceptance_rate: yup.number().required('入力してください'),
	number_of_submitted_papers: yup.number().required('入力してください'),
	number_of_accepted_papers: yup.number().required('入力してください'),
})

export const InternationalConferenceEvaluationForm = ({ type, defaultValues, setList }: FormProps<InternationalConferenceEvaluation>) => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<InternationalConferenceEvaluation>({
		resolver: yupResolver(InternationalConferenceEvaluationUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])

	console.log(defaultValues)

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createInternationalConferenceEvaluation(data)
			} else {
				await updateInternationalConferenceEvaluation(data)
			}
			await listInternationalConferenceEvaluations(setList)
			closeModal()
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listInternationalConferenceInfos(setInternationalConferenceInfoList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
				}}
			>
				<SelectWithError
					label='会議名'
					name='international_conference_info'
					control={control}
					errors={errors}
					required
					options={internationalConferenceInfosToOptions(internationalConferenceInfoList)}
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
					label='CORE Rank'
					name='core_rank'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='Qualis'
					name='qualis'
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
				<FormButton type={type} />
			</form>
		</div>
	)
}