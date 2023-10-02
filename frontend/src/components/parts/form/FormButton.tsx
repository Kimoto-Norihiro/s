import React from 'react'

export const FormButton = () => {
	return (
		<div className='flex justify-center mt-5'>
			<div className='py-2 px-7 bg-black text-white rounded hover:bg-white hover:text-black hover: border border-black'>
				<button type='submit'>作成する</button>
			</div>
		</div>
	)
}