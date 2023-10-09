export type TableProps<T> = {
	list: T[]
	setList: React.Dispatch<React.SetStateAction<T[]>>
}