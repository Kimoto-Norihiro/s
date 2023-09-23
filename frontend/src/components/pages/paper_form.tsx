import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Author, Paper, ConferenceAndJournal, Publisher, PaperKind } from '@/types/types'
import { InputWithError } from '@/components/parts/form/InputWithError'
import axios from 'axios';
import Select from "react-select"
import { SelectWithError } from '../parts/form/SelectWithError'
import { AddLabel } from '../parts/form/AddLabel'
import { FormButton } from '../parts/form/FormButton'

const currentYear = new Date().getFullYear()

const CreateSchema = yup.object().shape({
  title: yup.string().required('入力してください'),
  url: yup.string().required('入力してください'),
  start_page: yup.number().nullable()
  .typeError('数値を入力してください')
  .required('入力してください')
  .transform((value, originalValue) =>
    String(originalValue).trim() === '' ? null : value
  ),
  end_page: yup.number().nullable()
  .typeError('数値を入力してください')
  .required('入力してください')
  .transform((value, originalValue) =>
    String(originalValue).trim() === '' ? null : value
  ),
  authors: yup.array().required('選択してください'),
  conference_and_journal: yup.object().required('選択してください'),
  paper_kind: yup.object().required('選択してください'),
  year: yup.number().required('選択してください'),
  month: yup.number().required('選択してください'),
})

export type PaperCreateValues = Omit<Paper, 'id'>

export const PaperForm = () => {
	const { control, register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<PaperCreateValues>({
    resolver: yupResolver(CreateSchema)
  })
  const [authorList, setAuthorList] = useState<Author[]>([])
  const [conferenceAndJournalList, setConferenceAndJournalList] = useState<ConferenceAndJournal[]>([])
  const paperKindList = [
    {id: 1, name: '国内学会'},
    {id: 2, name: '国際学会'},
    {id: 3, name: 'ジャーナル'},
  ]

  const AuthorsToOptions = (list: Author[]) => {
    return list.map((author) => {
      return {
        value: author.id,
        label: `${author.ja_first_name} ${author.ja_last_name}`
      }
    })
  }

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

  const indexConferenceAndJournal = async () => {
    try {
      const res = await axios.get('http://localhost:8080/conference_and_journals', {
        withCredentials: true
      })
      setConferenceAndJournalList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const createPaper = async (data: PaperCreateValues) => {
    try {
      const res = await axios.post('http://localhost:8080/paper', data, {
        withCredentials: true
      }) 
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const submit = () => {
    setValue("pdf_path", "pdf_path_sample")
    handleSubmit(async (data) => {
      await createPaper(data)
      console.log("create Paper")
    }, (error) => {
      console.log(error)
      console.log('error')
    })()
  }

  useEffect(() => {
    indexAuthor()
    indexConferenceAndJournal()
  }, [])

  useEffect(() => {
    console.log(authorList)
    console.log(conferenceAndJournalList)
  }, [authorList, conferenceAndJournalList])

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
						<SelectWithError
							label='年'
							name='year'
							control={control}
							errors={errors}
							required
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
							required
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
				<SelectWithError
					label='種類'
					name='paper_kind'
					control={control}
					errors={errors}
					required
					options={paperKindList.map((paperKind) => {
						return {
							value: paperKind.id,
							label: `${paperKind.name}`
						}
					})}
					list={paperKindList}
				/>
				<SelectWithError
					label='会議名またはジャーナル名'
					name='conference_and_journal'
					control={control}
					errors={errors}
					required
					options={conferenceAndJournalList.map((conference_and_journal) => {
						return {
							value: conference_and_journal.id,
							label: `${conference_and_journal.name}`
						}
					})}
					list={conferenceAndJournalList}
				/>
				<AddLabel label="著者" required>
					<Controller
						control={control}
						name="authors"
						render={({ field }) => (
							<Select
								isMulti
								options={AuthorsToOptions(authorList)}
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
				<InputWithError
					label='論文URL'
					name='url'
					register={register}
					errors={errors}
					required
				/>
				<div className='flex justify-between'>
					<div className='w-[45%]'>
						<InputWithError 
							label='開始ページ'
							name='start_page'
							register={register}
							errors={errors}
							required
						/>
					</div>
					<p>~</p>
					<div className='w-[45%]'>
						<InputWithError 
							label='終了ページ'
							name='end_page'
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