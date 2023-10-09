import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Publisher } from '@/types/publisher'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createPublisher } from '@/handlers/publisher_handlers'
import { FormProps } from '@/types/form'

const PublisherUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
})

export const PublisherForm = ({ type, defaultValues }: FormProps<Publisher>) => {
	const { register, handleSubmit, formState: { errors }} = useForm<Publisher>({
		resolver: yupResolver(PublisherUpsertSchema),
		defaultValues,
	})

	const submit = async () => {
		handleSubmit(async (data) => {
			await createPublisher(data)
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
				<FormButton />
			</form>
		</div>
	)
}