import React from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { AddLabel } from './AddLabel'

type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
	explain: string
}

const CheckBox = <T extends FieldValues>({ label, name, register, explain }: Props<T>) => {
	return (
		<AddLabel label={label}>
			<div className='w-full justify-start mb-5'>
				<input 
					className='mr-2'
					type="checkbox"
					{...register(name)}
				/>
				<label>{explain}</label>
			</div>
		</AddLabel>
	)
}

export default CheckBox