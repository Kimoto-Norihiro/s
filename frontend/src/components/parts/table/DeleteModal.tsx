import { useCommonModal } from "@/context/modal_context"

type Props = {
	deleteHandler: () => Promise<void>
}

export const DeleteModal = ({ deleteHandler }: Props) => {
	const { closeModal } = useCommonModal()
	return (
		<div className="w-96 flex flex-col justify-center items-center p-8 px-16 bg-white">
			<p className="mb-8">本当に削除しますか？</p>
			<div className="w-full flex justify-between">
				<div
					className='btn px-4 py-2 flex items-center justify-center'
					onClick={deleteHandler}
				>
					削除
				</div>
				<div 
					className='btn px-4 py-2 flex items-center justify-center'
					onClick={() => closeModal()}
				>
					戻る
				</div>
			</div>
		</div>
	)
}