export const useRequestChangeTask = (
	TODO_DB,
	isModalOpen,
	setRefreshTasks,
	refreshTasks
) => {
	const requestChangeTask = () => {
		isModalOpen.taskValue = isModalOpen.taskValue.trim()
		if (isModalOpen.taskValue.length > 0) {
			fetch(`${TODO_DB}/${isModalOpen.idTask}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: isModalOpen.taskValue })
			}).then(() => setRefreshTasks(!refreshTasks))
		}
	}

	return {
		requestChangeTask
	}
}
