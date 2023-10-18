import { useState } from 'react'

export const useRequestClickChangeTask = () => {
	const [isModalOpen, setIsModalOpen] = useState({
		isOpen: false,
		taskValue: '',
		idTask: ''
	})

	const handleClickChangeTask = (idTask, todoTitle) => {
		setIsModalOpen({
			...isModalOpen,
			isOpen: true,
			taskValue: todoTitle,
			idTask: idTask
		})
	}

	return {
		handleClickChangeTask,
		isModalOpen,
		setIsModalOpen
	}
}
