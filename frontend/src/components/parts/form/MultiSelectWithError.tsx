import React from 'react'
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
	options: Options<{label: string, value: PathValue<T, Path<T>>,}>
}

export const MultiSelectWithError = <T extends FieldValues>({ label, name, control, errors, required, options }: Props<T>) => {
	return (
		<AddLabel label={label} required={required}>
			<Controller
				control={control}
				name={name}
				render={({ field }) => {
					const defaultValue = options.filter((option) => {
						if (!field.value) return false
						const result = field.value.map((value: any) => {
							return _.isEqual(value, option.value)
						})
						return result.includes(true)
					})
					console.log(defaultValue)
					return(
						<Select
							isMulti
							value={defaultValue}
							options={options}
							onChange={(options) => {
								if (!options) return
								field.onChange(options.map((option) => option.value))
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