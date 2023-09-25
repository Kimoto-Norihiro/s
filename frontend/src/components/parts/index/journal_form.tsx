import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { InputWithError } from '../../parts/form/InputWithError';
import { SelectWithError } from '../../parts/form/SelectWithError';
import { FormButton } from '../../parts/form/FormButton';
import { Publisher } from '@/types/publisher'
import { JournalUpsertValues } from '@/types/journal'
import { createJournal } from '@/handlers/journal_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { AddLabel } from '../form/AddLabel'
import Select from 'react-select'

const currentYear = new Date().getFullYear()

const JournalUpsertSchema = yup.object().shape({
	authors: yup.array().required('選択してください'),
	title: yup.string().required('入力してください'),
	journal_info: yup.object().required('選択してください'),
	is_joint_research: yup.boolean().required('選択してください'),
	is_manuscript_exist: yup.boolean().required('選択してください'),
	is_appendix_exist: yup.boolean().required('選択してください'),
	is_domestic: yup.boolean().required('選択してください'),
	tags: yup.array().required('選択してください'),
})

export const JournalForm = () => {
	const { control, register, handleSubmit, formState: { errors }, watch} = useForm<JournalUpsertValues>({
		resolver: yupResolver(JournalUpsertSchema)
	})
	const [authorList, setAuthorList] = useState<Authors>([])

	const indexAuthor = async () => {
    try {
      const res = await axios.get('http://localhost:8080/authors', {
        withCredentials: true
      })
      console.log('index', res.data)
      setAuthorList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

	const submit = async () => {
		handleSubmit(async (data) => {
			await createJournal(data)
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	useEffect(() => {
		indexAuthor()
	}, [])

	return (
		<div className='w-full flex flex-col items-center'>
			<form 
				className='w-[60%] flex flex-col' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<AddLabel label="著者" required>
					<Controller
						control={control}
						name="authors"
						render={({ field }) => (
							<Select
								isMulti
								options={authorsToOptions(authorList)}
								onChange={(e) => {
									const newAuthors = e.map((option) => {
										return authorList[option.value-1]
									})
									field.onChange(newAuthors)
								}}
							/>
						)}
					/>
				</AddLabel>
				{
					errors['authors'] ? <div className='text-red-800 text-sm'>{`${errors['authors']?.message}`}</div> : <div className='h-5'></div>
				}
				<InputWithError
					label='題目' 
					name='title'
					register={register}
					errors={errors}
					required
				/>
				<SelectWithError 
					label='雑誌情報'
					name='journal_info'
					control={control}
					errors={errors}
					required
					options = {
						Array.from(Array(12).keys()).map((month) => {
							return {
								value: month+1,
								label: `${month+1}`
							}
						})
					}
				/>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<InputWithError 
							label='巻'
							name='start_page'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[45%]'>
						<InputWithError 
							label='号'
							name='end_page'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<InputWithError 
							label='開始ページ'
							name='start_page'
							register={register}
							errors={errors}
						/>
					</div>
					<p>~</p>
					<div className='w-[45%]'>
						<InputWithError 
							label='終了ページ'
							name='end_page'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<SelectWithError
							label='年'
							name='year'
							control={control}
							errors={errors}
							options={Array.from(Array(200).keys()).map((year) => {
								return {
									value: currentYear - year,
									label: `${currentYear - year}`
								}
							})}
						/>
					</div>
					<div className='w-[45%]'>
						<SelectWithError
							label='月'
							name='month'
							control={control}
							errors={errors}
							options={
								Array.from(Array(12).keys()).map((month) => {
									return {
										value: month+1,
										label: `${month+1}`
									}
								})
							}
						/>
					</div>
				</div>
				<InputWithError
					label='メインURL'
					name='url1'
					register={register}
					errors={errors}
				/>
				<InputWithError
					label='サブURL'
					name='url2'
					register={register}
					errors={errors}
				/>
				<InputWithError
					label='DOI'
					name='doi'
					register={register}
					errors={errors}
				/>
				<SelectWithError 
					label='ジャーナル評価'
					name='evaluation'
					control={control}
					errors={errors}
					required
					options = {
						Array.from(Array(12).keys()).map((month) => {
							return {
								value: month+1,
								label: `${month+1}`
							}
						})
					}
				/>
				<InputWithError
					label='査読課程'
					name='peer_review_course'
					register={register}
					errors={errors}
				/>
				<AddLabel label="分野タグ" required>
					<Controller
						control={control}
						name="authors"
						render={({ field }) => (
							<Select
								isMulti
								options={authorsToOptions(authorList)}
								onChange={(e) => {
									const newAuthors = e.map((option) => {
										return authorList[option.value-1]
									})
									field.onChange(newAuthors)
								}}
							/>
						)}
					/>
				</AddLabel>
				{
					errors['authors'] ? <div className='text-red-800 text-sm'>{`${errors['authors']?.message}`}</div> : <div className='h-5'></div>
				}
				<FormButton />
			</form>
		</div>
	)
}