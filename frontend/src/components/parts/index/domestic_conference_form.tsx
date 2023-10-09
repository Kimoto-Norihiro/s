import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '../form/InputWithError';
import { SelectWithError } from '../form/SelectWithError';
import { FormButton } from '../form/FormButton';
import { createDomesticConference, updateDomesticConference } from '@/handlers/domestic_conference_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { DomesticConferenceInfos } from '../../../types/domestic_conference_info';
import { listDomesticConferenceInfos } from '@/handlers/domestic_conference_info_handlers';
import CheckBox from '../form/CheckBox';
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { DomesticConference } from '@/types/domestic_conference';
import { FormProps } from '@/types/form'
import { numberCondition } from '@/types/form';
import { listDomesticConferences } from '../../../handlers/domestic_conference_handlers';
import { useCommonModal } from '@/context/modal_context';

const currentYear = new Date().getFullYear()

const DomesticConferenceUpsertSchema = yup.object().shape({
	authors: yup.array().required('選択してください'),
	title: yup.string().required('入力してください'),
	volume: numberCondition,
	number: numberCondition,
	start_page: numberCondition,
	end_page: numberCondition,
	year: yup.number().required('選択してください'),
	domestic_conference_info: yup.object().required('選択してください'),
	tags: yup.array().required('選択してください'),
})

export const DomesticConferenceForm = ({ type, defaultValues, setList }: FormProps<DomesticConference>) => {
	const { control, register, handleSubmit, formState: { errors }, watch} = useForm<DomesticConference>({
		resolver: yupResolver(DomesticConferenceUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()
	const [authorList, setAuthorList] = useState<Authors>([])
	const [domesticConferenceInfoList, setDomesticConferenceInfoList] = useState<DomesticConferenceInfos>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createDomesticConference(data)
			} else {
				await updateDomesticConference(data)
			}
			listDomesticConferences(setList)
			closeModal
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	useEffect(() => {
		listAuthors(setAuthorList)
		listDomesticConferenceInfos(setDomesticConferenceInfoList)
		listTags(setTagList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={submit}
			>
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
							label='会議名'
							name='domestic_conference_info'
							control={control}
							errors={errors}
							required
							options={domesticConferenceInfoList.map((domestic_conference_info) => {
								return {
									value: domestic_conference_info.id,
									label: `${domestic_conference_info.name}`
								}
							})}
							list={domesticConferenceInfoList}
						/>
					</div>
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
				</div>
				<div className='flex justify-between'>
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
					<div className='w-[50%] pr-4'> 
						<InputWithError
							label='メインURL'
							name='url1'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='サブURL'
							name='url2'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[50%] pr-4'> 
						<InputWithError
							label='DOI'
							name='doi'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='会場'
							name='venue'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='都市'
							name='city'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='共同研究'
							name='is_joint_research'
							register={register}
							explain='該当する'
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='原稿'
							name='is_manuscript_exist'
							register={register}
							explain='存在する'
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='スライドPDF'
							name='is_slide_pdf_exist'
							register={register}
							explain='存在する'
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='スライドPPT'
							name='is_slide_pdf_exist'
							register={register}
							explain='存在する'
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='ポスター'
							name='is_poster_exist'
							register={register}
							explain='存在する'
						/>
					</div>
					<div className='w-[25%] pr-4'>
						<CheckBox 
							label='ビデオ'
							name='is_video_exist'
							register={register}
							explain='存在する'
						/>
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
				</div>
				<FormButton />
			</form>
		</div>
	)
}