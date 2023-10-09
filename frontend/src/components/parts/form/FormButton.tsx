import React from 'react'
import { FormType } from '@/types/form';

type Props = {
	type?: FormType
}

export const FormButton = ({ type }: Props) => {
	return (
		<div className='flex justify-center mt-5'>
			<div className='py-2 px-7 btn'>
				<button 
					type='submit'
				>
					{type === 'update' ? '更新' : '追加'}
				</button>
			</div>
		</div>
	)
}