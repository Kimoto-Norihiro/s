import React, { useEffect } from 'react'
import { AddLabel } from './AddLabel'
import { Controller, FieldErrors, FieldValues, Path, Control, PathValue } from 'react-hook-form';
import Select, { Options } from 'react-select'
import _ from 'lodash'

type Props<T extends FieldValues> = {
	label: string
	name: Path<T>
	control: Control<T>
	errors: FieldErrors<T>
	required?: boolean
	options: Options<{value: PathValue<T, Path<T>>, label: string}>
}

export const SelectWithError = <T extends FieldValues>({ label, name, control, errors, required, options}: Props<T>) => {
	return (
		<AddLabel label={label} required={required}>
			<Controller
				control={control}
				name={name}
				render={({ field }) => {
					const defaultValue = options.find((option) => _.isEqual(option.value, field.value))
					return(
						<Select
							value={defaultValue}
							options={options}
							onChange={(option) => {
								if (!option) return
								field.onChange(option.value)
							}}
						/>
					)
				}}
			/>
			{
        errors[name] ? <div className='text-red-800 text-sm'>{`${errors[name]?.message}`}</div> : <div className='h-5'></div>
      }
		</AddLabel>
	)
}