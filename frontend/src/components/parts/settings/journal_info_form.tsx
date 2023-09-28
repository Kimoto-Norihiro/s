import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { JournalInfoUpsertValues } from '@/types/journal_info'
import { createJournalInfo } from '@/handlers/journal_info_handlers'
import { Publishers } from '@/types/publisher'
import { listPublishers } from '@/handlers/publisher_handlers'

const JournalInfoUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
  iso4_name: yup.string().required('入力してください'),
  publisher: yup.object().required('選択してください'),
})

export const JournalInfoForm = () => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<JournalInfoUpsertValues>({
		resolver: yupResolver(JournalInfoUpsertSchema)
	})
	const [publisherList, setPublisherList] = useState<Publishers>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			await createJournalInfo(data)
			console.log("create journal info")
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listPublishers(setPublisherList)
	}, [])

	return (
		<div className='w-full flex flex-col items-center'>
			<form 
				className='w-[60%] flex flex-col' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<InputWithError 
					label='出版社名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='省略名'
					name='short_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='省略名'
					name='short_name'
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
					options={publisherList.map((publisher) => {
						return {
							value: publisher.id,
							label: `${publisher.name}`
						}
					})}
					list={publisherList}
				/>
				<FormButton />
			</form>
		</div>
	)
}