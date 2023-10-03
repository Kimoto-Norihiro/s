import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '../../parts/form/InputWithError';
import { SelectWithError } from '../../parts/form/SelectWithError';
import { FormButton } from '../../parts/form/FormButton';
import { JournalUpsertValues } from '@/types/journal'
import { createJournal } from '@/handlers/journal_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { JournalInfos } from '../../../types/journal_info';
import { listJournalInfos } from '@/handlers/journal_info_handlers';
import CheckBox from '../form/CheckBox';
import { MultiSelectWithError } from '../form/MultiSelectWithError';

const currentYear = new Date().getFullYear()

const numberCondition = yup.number()
.typeError('数字を入力してください')
.integer('整数を入力してください')
.min(0, '0以上の数字を入れてください')
.nullable()
.transform((value, originalValue) =>
  String(originalValue).trim() === '' ? null : value
)

const JournalUpsertSchema = yup.object().shape({
	authors: yup.array().required('選択してください'),
	title: yup.string().required('入力してください'),
	volume: numberCondition,
	number: numberCondition,
	start_page: numberCondition,
	end_page: numberCondition,
	year: yup.number().required('選択してください'),
	journal_info: yup.object().required('選択してください'),
	tags: yup.array().required('選択してください'),
})

export const JournalForm = () => {
	const { control, register, handleSubmit, formState: { errors }, watch} = useForm<JournalUpsertValues>({
		resolver: yupResolver(JournalUpsertSchema)
	})
	const [authorList, setAuthorList] = useState<Authors>([])
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			await createJournal(data)
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	const { authors, tags } = watch()

	useEffect(() => {
		console.log(authors)
	}, [authors])

	useEffect(() => {
		console.log(tags)
	}, [tags])

	useEffect(() => {
		listAuthors(setAuthorList)
		listJournalInfos(setJournalInfoList)
		listTags(setTagList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<MultiSelectWithError
							label='著者'
							name='authors'
							control={control}
							errors={errors}
							required
							options={authorsToOptions(authorList)}
							list={authorList}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='題目' 
							name='title'
							register={register}
							errors={errors}
							required
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<SelectWithError
							label='雑誌名'
							name='journal_info'
							control={control}
							errors={errors}
							required
							options={journalInfoList.map((journal_info) => {
								return {
									value: journal_info.id,
									label: `${journal_info.name}`
								}
							})}
							list={journalInfoList}
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<InputWithError 
							label='巻'
							name='volume'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<InputWithError 
							label='号'
							name='number'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[25%] pr-4'>
						<InputWithError 
							label='開始ページ'
							name='start_page'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<InputWithError 
							label='終了ページ'
							name='end_page'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<SelectWithError
							label='年'
							name='year'
							required
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
					<div className='w-[25%] pr-4'>
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
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='メインURL'
							name='url1'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='サブURL'
							name='url2'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='DOI'
							name='doi'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='査読課程'
							name='peer_review_course'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[25%]'>
						<CheckBox 
							label='共同研究'
							name='is_joint_research'
							register={register}
							explain='該当する'
						/>
					</div>
					<div className='w-[25%]'>
						<CheckBox 
							label='原稿'
							name='is_manuscript_exist'
							register={register}
							explain='存在する'
						/>
					</div>
					<div className='w-[25%]'>
						<CheckBox 
							label='付録'
							name='is_appendix_exist'
							register={register}
							explain='存在する'
						/>
					</div>
					<div className='w-[25%]'>
						<CheckBox 
							label='国内'
							name='is_domestic'
							register={register}
							explain='該当する'
						/>
					</div>
				</div>
				<div className='w-[50%] pr-4'>
					<MultiSelectWithError 
						label='分野タグ'
						name='tags'
						control={control}
						errors={errors}
						required
						options={tagsToOptions(tagList)}
						list={tagList}
					/>
				</div>
				
				<FormButton />
			</form>
		</div>
	)
}