import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { Publishers, publishersToOptions } from '@/types/publisher'
import { listPublishers } from '@/handlers/publisher_handlers'
import { DomesticConferenceInfo } from '@/types/domestic_conference_info'
import { createDomesticConferenceInfo, listDomesticConferenceInfos, updateDomesticConferenceInfo } from '@/handlers/domestic_conference_info_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'

const DomesticConferenceInfoUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
  other_name: yup.string().required('入力してください'),
  publisher: yup.object().required('選択してください'),
})

export const DomesticConferenceInfoForm = ({ type, defaultValues, setList }: FormProps<DomesticConferenceInfo>) => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<DomesticConferenceInfo>({
		resolver: yupResolver(DomesticConferenceInfoUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()
	const [publisherList, setPublisherList] = useState<Publishers>([])

	console.log(defaultValues)

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createDomesticConferenceInfo(data)
				console.log("create domestic conference info")
			} else {
				await updateDomesticConferenceInfo(data)
			}
			await listDomesticConferenceInfos(setList)
			closeModal()
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listPublishers(setPublisherList)
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
				<InputWithError 
					label='会議名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='略称名'
					name='short_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='別名'
					name='other_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='論文集'
					name='collection_notation'
					register={register}
					errors={errors}
					required
				/>
				<SelectWithError
					label='出版社'
					name='publisher'
					control={control}
					errors={errors}
					required
					options={publishersToOptions(publisherList)}
				/>
				<FormButton type={type} />
			</form>
		</div>
	)
}