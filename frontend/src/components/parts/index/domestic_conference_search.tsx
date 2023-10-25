import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '../form/InputWithError';
import { SelectWithError } from '../form/SelectWithError';
import { FormButton } from '../form/FormButton';
import { createDomesticConference, listDomesticConferences } from '@/handlers/domestic_conference_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { DomesticConferenceInfos, domesticConferenceInfosToOptions } from '../../../types/domestic_conference_info';
import { listDomesticConferenceInfos } from '@/handlers/domestic_conference_info_handlers';
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { DomesticConference, DomesticConferenceFilter } from '@/types/domestic_conference';
import { SearchButton } from '../form/SearchButton';
import { useCommonModal } from '@/context/modal_context';

const DomesticConferenceSearchSchema = yup.object().shape({})

type Props = {
	filter: DomesticConferenceFilter
	setFilter: React.Dispatch<React.SetStateAction<DomesticConferenceFilter>>
	setDomesticConferenceList: React.Dispatch<React.SetStateAction<DomesticConference[]>>
}

export const DomesticConferenceSearch = ({ filter, setFilter, setDomesticConferenceList }: Props) => {
	const { control, register, handleSubmit, formState: { errors }} = useForm<DomesticConferenceFilter>({
		resolver: yupResolver(DomesticConferenceSearchSchema),
		defaultValues: filter,
	})
	const { closeModal } = useCommonModal()
	const [authorList, setAuthorList] = useState<Authors>([])
	const [domesticConferenceInfoList, setDomesticConferenceInfoList] = useState<DomesticConferenceInfos>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			listDomesticConferences(setDomesticConferenceList, data)
			setFilter(data)
			closeModal()
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
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='題目' 
							name='title'
							register={register}
							errors={errors}
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
							options={domesticConferenceInfosToOptions(domesticConferenceInfoList)}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<MultiSelectWithError 
							label='分野タグ'
							name='tags'
							control={control}
							errors={errors}
							options={tagsToOptions(tagList)}
						/>
					</div>
				</div>
				<SearchButton />
			</form>
		</div>
	)
}