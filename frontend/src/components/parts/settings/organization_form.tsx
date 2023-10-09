import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Organization } from '@/types/organization'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createOrganization } from '@/handlers/organization_handlers'
import { FormProps } from '@/types/form'

const OrganizationUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
})

export const OrganizationForm = ({ type, defaultValues }: FormProps<Organization>) => {
	const { register, handleSubmit, formState: { errors }} = useForm<Organization>({
		resolver: yupResolver(OrganizationUpsertSchema),
		defaultValues,
	})

	const submit = async () => {
		handleSubmit(async (data) => {
			await createOrganization(data)
			console.log("create Organization")
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