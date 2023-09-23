import React from 'react'

type Props = {
	label: string
	required?: boolean
	children: React.ReactNode
}

export const AddLabel = ({label, required, children}: Props) => {
	return (
		<div className='flex flex-col align-center'>
			<div className='flex mb-1'>
				<p>{label}</p>
				{
					required && (
						<div className='flex justify-center items-center bg-black ml-2 px-1 rounded-md'>
							<p className='text-[8px] text-white'>必須</p>
						</div>
					)
				}
			</div>
			{ children }
		</div>
	)
}