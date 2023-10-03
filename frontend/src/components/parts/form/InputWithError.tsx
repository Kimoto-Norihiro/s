import React from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { AddLabel } from './AddLabel'

type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  required?: boolean
}

export const InputWithError = <T extends FieldValues>({ label, name, register, errors, required }: Props<T> ) => {
  return (
    <div>
      <AddLabel label={label} required={required}>
        <input type="text" className='border border-gray-300 rounded-md h-[38px] px-3' id={name} {...register(name, {required: true})}/>
      </AddLabel>
      {
        errors[name] ? <div className='text-red-800 text-sm'>{`${errors[name]?.message}`}</div> : <div className='h-5'></div>
      }
    </div>
  )
}