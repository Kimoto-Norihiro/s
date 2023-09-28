import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Tag } from '@/types/tag'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createTag } from '@/handlers/tag_handlers'

const TagUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
})

export type TagUpsertValues = Omit<Tag, 'id'>

export const TagForm = () => {
	const { register, handleSubmit, formState: { errors }} = useForm<TagUpsertValues>({
		resolver: yupResolver(TagUpsertSchema)
	})

	const submit = async () => {
		handleSubmit(async (data) => {
			await createTag(data)
			console.log("create Paper")
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	return (
		<div className='w-full flex flex-col items-center'>
			<form 
				className='w-[60%] flex flex-col'
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<InputWithError 
					label='分野タグ名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<FormButton />
			</form>
		</div>
	)
}