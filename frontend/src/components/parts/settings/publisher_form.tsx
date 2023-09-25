import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Publisher } from '@/types/publisher'
import axios from 'axios'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';

const PublisherUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
})

export type PublisherUpsertValues = Omit<Publisher, 'id'>

export const PublisherForm = () => {
	const { register, handleSubmit, formState: { errors }} = useForm<PublisherUpsertValues>({
		resolver: yupResolver(PublisherUpsertSchema)
	})

	const createPublisher = async (data: PublisherUpsertValues) => {
		try {
			const res = await axios.post('http://localhost:8080/publisher', data, {
				withCredentials: true
			})
			console.log(res.data)
		} catch (err) {
			console.log(err)
		}
	}

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
				<FormButton />
			</form>
		</div>
	)
}