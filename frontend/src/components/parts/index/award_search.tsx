import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { set, useForm } from 'react-hook-form'
import { InputWithError } from '../form/InputWithError';
import { SelectWithError } from '../form/SelectWithError';
import { FormButton } from '../form/FormButton';
import { createAward, listAwards } from '@/handlers/award_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { Award, Awards } from '@/types/award';
import { Organizations, organizationsToOptions } from '../../../types/organization';
import { listOrganizations } from '@/handlers/organization_handlers';
import { SearchButton } from '../form/SearchButton';
import { useCommonModal } from '@/context/modal_context';

type Props = {
	setAwardList: React.Dispatch<React.SetStateAction<Awards>>
}

const AwardSearchSchema = yup.object().shape({})

export const AwardSearch = ({ setAwardList }: Props) => {
	const { control, register, handleSubmit, formState: { errors }} = useForm<Award>({
		resolver: yupResolver(AwardSearchSchema),
	})
	const { closeModal } = useCommonModal()
	const [authorList, setAuthorList] = useState<Authors>([])
	const [organizationList, setOrganizationList] = useState<Organizations>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			await listAwards(setAwardList, data)
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
							options={authorsToOptions(authorList)}
							list={authorList}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='賞名' 
							name='name'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
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
					<div className='w-[50%] pr-4'>
						<MultiSelectWithError 
							label='分野タグ'
							name='tags'
							control={control}
							errors={errors}
							options={tagsToOptions(tagList)}
							list={tagList}
						/>
					</div>
				</div>
				<SearchButton />
			</form>
		</div>
	)
}