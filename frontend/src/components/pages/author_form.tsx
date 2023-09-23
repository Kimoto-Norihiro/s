import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Author } from '@/types/types'
import { InputWithError } from '@/components/parts/form/InputWithError'
import axios from 'axios'
import { FormButton } from '../parts/form/FormButton';

const AuthorUpsertSchema = yup.object().shape({
  ja_first_name: yup.string().required('入力してください'),
	ja_last_name: yup.string().required('入力してください'),
	en_first_name: yup.string().required('入力してください'),
	en_last_name: yup.string().required('入力してください'),
})

export type AuthorUpsertValues = Omit<Author, 'id'>

export const AuthorForm = () => {
	const { register, handleSubmit, formState: { errors }} = useForm<AuthorUpsertValues>({
		resolver: yupResolver(AuthorUpsertSchema)
	})

	const createAuthor = async (data: AuthorUpsertValues) => {
		try {
			const res = await axios.post('http://localhost:8080/author', data, {
				withCredentials: true
			})
			console.log(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	const submit = async () => {
		handleSubmit(async (data) => {
      await createAuthor(data)
      console.log("create Paper")
    }, (error) => {
      console.log(error)
      console.log('error')
    })()
	}

	return (
		<div className='w-[60%]'>
			<form 
				className='w-full flex flex-col' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<InputWithError 
							label='姓（日）'
							name='ja_last_name'
							register={register}
							errors={errors}
							required
						/>
					</div>
					<div className='w-[45%]'>
						<InputWithError 
							label='名（日）'
							name='ja_first_name'
							register={register}
							errors={errors}
							required
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<InputWithError 
							label='姓（英）'
							name='en_last_name'
							register={register}
							errors={errors}
							required
						/>
					</div>
					<div className='w-[45%]'>
						<InputWithError 
							label='名（英）'
							name='en_first_name'
							register={register}
							errors={errors}
							required
						/>
					</div>
				</div>
				<FormButton />
			</form>
		</div>
	)
}