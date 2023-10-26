import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '../form/InputWithError';
import { SelectWithError } from '../form/SelectWithError';
import { FormButton } from '../form/FormButton';
import { createAward, listAwards, updateAward } from '@/handlers/award_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import CheckBox from '../form/CheckBox';
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { Award } from '@/types/award';
import { Organizations, organizationsToOptions } from '../../../types/organization';
import { listOrganizations } from '@/handlers/organization_handlers';
import { FormProps } from '@/types/form'
import { numberCondition } from '@/types/form';
import { useCommonModal } from '@/context/modal_context';

const currentYear = new Date().getFullYear()

const AwardUpsertSchema = yup.object().shape({
	authors: yup.array().required('選択してください'),
	name: yup.string().required('入力してください'),
	year: yup.number().required('選択してください'),
	organization: yup.object().required('選択してください'),
	tags: yup.array().required('選択してください'),
})

export const AwardForm = ({ type, defaultValues, setList }: FormProps<Award>) => {
	const { control, register, handleSubmit, formState: { errors }} = useForm<Award>({
		resolver: yupResolver(AwardUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()
	const [authorList, setAuthorList] = useState<Authors>([])
	const [organizationList, setOrganizationList] = useState<Organizations>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			if (type === 'create') {
				await createAward(data)
			} else {
				await updateAward(data)
			}
			await listAwards(setList)
			closeModal()
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	useEffect(() => {
		listAuthors(setAuthorList)
		listOrganizations(setOrganizationList)
		listTags(setTagList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
				}}
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
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='賞名' 
							name='name'
							register={register}
							errors={errors}
							required
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
						<SelectWithError
							label='表彰団体'
							name='organization'
							required
							control={control}
							errors={errors}
							options={organizationsToOptions(organizationList)}
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
							label='賞状'
							name='is_certificate_exist'
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
						/>
					</div>
				</div>
				<FormButton type={type} />
			</form>
		</div>
	)
}