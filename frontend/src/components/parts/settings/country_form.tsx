import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Country } from '@/types/country'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createCountry, listCountries, updateCountry } from '@/handlers/country_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'

const CountryUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
})

export const CountryForm = ({ type, defaultValues, setList }: FormProps<Country>) => {
	const { register, handleSubmit, formState: { errors }} = useForm<Country>({
		resolver: yupResolver(CountryUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createCountry(data)
			} else {
				await updateCountry(data)
			}
			await listCountries(setList)
			closeModal()
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
					submit()
				}}
			>
				<InputWithError 
					label='国名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<FormButton type={type} />
			</form>
		</div>
	)
}