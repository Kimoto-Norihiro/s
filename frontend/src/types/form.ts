import * as yup from 'yup'

export type FormType = 'create' | 'update'

export type FormProps<T> = {
	type: FormType
	defaultValues?: T
}

export const numberCondition = yup.number()
.typeError('数字を入力してください')
.integer('整数を入力してください')
.min(0, '0以上の数字を入れてください')
.nullable()
.transform((value, originalValue) =>
  String(originalValue).trim() === '' ? null : value
)