// import React, { useEffect, useState } from 'react'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import axios from 'axios'
// import { ConferenceAndJournal, PaperKind, Publisher } from '../../types/types';
// import { InputWithError } from '../parts/form/InputWithError';
// import { SelectWithError } from '../parts/form/SelectWithError';
// import { FormButton } from '../parts/form/FormButton';

// const ConferenceAndJournalUpsertSchema = yup.object().shape({
// 	name: yup.string().required('入力してください'),
// 	short_name: yup.string().required('入力してください'),
// 	// iso4_name: yup.string().required('入力してください'),
// 	publisher: yup.object().required('選択してください'),
// 	paper_kind: yup.object().required('選択してください'),
// })

// export type JournalUpsertValues = Omit<Journal, 'id'>

// export const ConferenceAndJournalForm = () => {
// 	const { control, register, handleSubmit, formState: { errors }, watch} = useForm<ConferenceAndJournalUpsertValues>({
// 		resolver: yupResolver(ConferenceAndJournalUpsertSchema)
// 	})

// 	const [publisherList, setPublisherList] = useState<Publisher[]>([])

// 	const indexPublisher = async () => {
// 		try {
// 			const res = await axios.get('http://localhost:8080/publishers', {
// 				withCredentials: true
// 			})
// 			setPublisherList(res.data)
// 			console.log(res.data)
// 		} catch (err) {
// 			console.log(err)
// 		}
// 	}

// 	const createConferenceAndJournal = async (data: ConferenceAndJournalUpsertValues) => {
// 		try {
// 			const res = await axios.post('http://localhost:8080/conference_and_journal', data, {
// 				withCredentials: true
// 			})
// 			console.log(res.data)
// 		} catch (err) {
// 			console.log(err)
// 		}
// 	}

// 	const submit = async () => {
// 		handleSubmit(async (data) => {
// 			await createConferenceAndJournal(data)
// 		}, (error) => {
// 			console.log(error)
// 			console.log('error')
// 		})()
// 	}

// 	useEffect(() => {
// 		indexPublisher()
// 	}, [])

// 	useEffect(() => {
// 		console.log(publisherList)
// 	}, [publisherList])

// 	const { paper_kind } = watch()

// 	return (
// 		<div className='w-[60%]'>
// 			<form 
// 				className='w-full flex flex-col' 
// 				onSubmit={(e) => {
// 					e.preventDefault()
// 					submit()
// 			}}>
// 				<SelectWithError
// 					label='種類'
// 					name='paper_kind'
// 					control={control}
// 					errors={errors}
// 					required
// 					options={paperKindList.map((paperKind) => {
// 						return {
// 							value: paperKind.id,
// 							label: `${paperKind.name}`
// 						}
// 					})}
// 					list={paperKindList}
// 				/>
// 				<InputWithError 
// 					label='会議名orジャーナル名'
// 					name='name'
// 					register={register}
// 					errors={errors}
// 					required
// 				/>
// 				<InputWithError 
// 					label='省略名'
// 					name='short_name'
// 					register={register}
// 					errors={errors}
// 					required
// 				/>
// 				<InputWithError 
// 					label='ISO4名'
// 					name='iso4_name'
// 					register={register}
// 					errors={errors}
// 				/>
// 				<SelectWithError
// 					label='出版社'
// 					name='publisher'
// 					control={control}
// 					errors={errors}
// 					required
// 					options={publisherList.map((publisher) => {
// 						return {
// 							value: publisher.id,
// 							label: `${publisher.name}`
// 						}
// 					})}
// 					list={publisherList}
// 				/>
// 				<FormButton />
// 			</form>
// 		</div>
// 	)
// }