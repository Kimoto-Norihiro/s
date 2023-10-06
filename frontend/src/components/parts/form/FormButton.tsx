import React from 'react'
import { FormType } from '../settings/author_form'
import { useCommonModal } from '@/context/modal_context'

type Props = {
	type?: FormType
}

export const FormButton = ({ type }: Props) => {
	const { closeModal } = useCommonModal()
	return (
		<div className='flex justify-center mt-5'>
			<div className='py-2 px-7 btn'>
				<button 
					type='submit'
					onClick={closeModal}
				>
					{type === 'update' ? '更新' : '追加'}
				</button>
			</div>
		</div>
	)
}