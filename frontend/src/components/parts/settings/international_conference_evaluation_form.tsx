import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { InternationalConferenceEvaluationUpsertValues } from '@/types/international_conference_evaluation'
import { InternationalConferenceInfos } from '@/types/international_conference_info'
import { listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers'
import { createInternationalConferenceEvaluation } from '@/handlers/international_conference_evaluation_handlers'

const currentYear = new Date().getFullYear()

const InternationalConferenceEvaluationUpsertSchema = yup.object().shape({
	international_conference_info: yup.object().required('選択してください'),
	year: yup.number().required('選択してください'),
	if: yup.number().required('入力してください'),
	acceptance_rate: yup.number().required('入力してください'),
	number_of_submitted_papers: yup.number().required('入力してください'),
	number_of_accepted_papers: yup.number().required('入力してください'),
})

export const InternationalConferenceEvaluationForm = () => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<InternationalConferenceEvaluationUpsertValues>({
		resolver: yupResolver(InternationalConferenceEvaluationUpsertSchema)
	})
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			await createInternationalConferenceEvaluation(data)
			console.log("create journal info")
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listInternationalConferenceInfos(setInternationalConferenceInfoList)
	}, [])

	return (
		<div className='w-full flex flex-col items-center'>
			<form 
				className='w-[60%] flex flex-col' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<SelectWithError
					label='会議名'
					name='international_conference_info'
					control={control}
					errors={errors}
					required
					options={internationalConferenceInfoList.map((international_conference_info) => {
						return {
							value: international_conference_info.id,
							label: `${international_conference_info.name}`
						}
					})}
					list={internationalConferenceInfoList}
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
				<FormButton />
			</form>
		</div>
	)
}