import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '../../parts/form/InputWithError';
import { SelectWithError } from '../../parts/form/SelectWithError';
import { FormButton } from '../../parts/form/FormButton';
import { Journal } from '@/types/journal'
import { listJournals } from '@/handlers/journal_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { JournalInfos } from '../../../types/journal_info';
import { listJournalInfos } from '@/handlers/journal_info_handlers';
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { SearchButton } from '../form/SearchButton';

type Props = {
	setJournalList: React.Dispatch<React.SetStateAction<Journal[]>>
}

const JournalSearchSchema = yup.object().shape({})

export const JournalSearch = ({ setJournalList }: Props) => {
	const { control, register, handleSubmit, formState: { errors }} = useForm<Journal>({
		resolver: yupResolver(JournalSearchSchema)
	})
	const [authorList, setAuthorList] = useState<Authors>([])
	const [journalInfoList, setJournalInfoList] = useState<JournalInfos>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			listJournals(setJournalList)
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

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
							options={journalInfoList.map((journal_info) => {
								return {
									value: journal_info.id,
									label: `${journal_info.name}`
								}
							})}
							list={journalInfoList}
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
				<SearchButton/>
			</form>
		</div>
	)
}