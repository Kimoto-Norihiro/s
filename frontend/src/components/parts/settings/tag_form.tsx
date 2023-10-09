import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Tag } from '@/types/tag'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createTag } from '@/handlers/tag_handlers'
import { FormProps } from '@/types/form'

const TagUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
})

export const TagForm = ({ type, defaultValues }: FormProps<Tag>) => {
	const { register, handleSubmit, formState: { errors }} = useForm<Tag>({
		resolver: yupResolver(TagUpsertSchema),
		defaultValues,
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
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
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