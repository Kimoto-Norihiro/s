import React from 'react'
import { AddLabel } from './AddLabel'
import { Controller, FieldErrors, FieldValues, Path, Control, Field } from 'react-hook-form';
import Select from 'react-select'

type Props<T extends FieldValues> = {
	label: string
	name: Path<T>
	control: Control<T>
	errors: FieldErrors<T>
	required?: boolean
	options: {value: number, label: string}[]
	list?: any[]
}

export const SelectWithError = <T extends FieldValues>({ label, name, control, errors, required, options, list}: Props<T>) => {
	return (
		<AddLabel label={label} required={required}>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Select
						options={options}
						onChange={(option) => {
							if (!option) return
							if (!list) {
								field.onChange(option.value)
								return
							}
							field.onChange(list[option.value-1])
						}}
					/>
				)}
			/>
			{
        errors[name] ? <div className='text-red-800 text-sm'>{`${errors[name]?.message}`}</div> : <div className='h-5'></div>
      }
		</AddLabel>
	)
}