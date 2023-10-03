import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Country } from '@/types/country'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createCountry } from '@/handlers/country_handlers'

const CountryUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
})

export type CountryUpsertValues = Omit<Country, 'id'>

export const CountryForm = () => {
	const { register, handleSubmit, formState: { errors }} = useForm<CountryUpsertValues>({
		resolver: yupResolver(CountryUpsertSchema)
	})

	const submit = async () => {
		handleSubmit(async (data) => {
			await createCountry(data)
			console.log("create Country")
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
					label='国名'
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