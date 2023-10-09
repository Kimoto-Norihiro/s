import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Author } from '@/types/author'
import { InputWithError } from '../form/InputWithError'
import { FormButton } from '../form/FormButton';
import { createAuthor, listAuthors, updateAuthor } from '@/handlers/author_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'

const AuthorUpsertSchema = yup.object().shape({
  ja_first_name: yup.string().required('入力してください'),
	ja_last_name: yup.string().required('入力してください'),
	en_first_name: yup.string().required('入力してください'),
	en_last_name: yup.string().required('入力してください'),
})

export const AuthorForm = ({ type, defaultValues, setList }: FormProps<Author>) => {
	const { register, handleSubmit, formState: { errors }} = useForm<Author>({
		resolver: yupResolver(AuthorUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'update') {
				await updateAuthor(data)
			} else {
				await createAuthor(data)
			}
			listAuthors(setList)
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
				<FormButton type={type} />
			</form>
		</div>
	)
}