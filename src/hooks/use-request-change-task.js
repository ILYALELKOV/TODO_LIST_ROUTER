export const useRequestChangeTask = () => {
	const requestChangeTask = (isModalOpen) => {
		isModalOpen.taskValue = isModalOpen.taskValue.trim()
		if (isModalOpen.taskValue.length > 0) {
			fetch(`http://localhost:3005/task/${isModalOpen.idTask}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: isModalOpen.taskValue })
			})
		}
	}

	return {
		requestChangeTask
	}
}
