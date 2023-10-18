export const useRequestDeleteTask = (
	TODO_DB,
	setRefreshTasks,
	refreshTasks
) => {
	const requestDeleteTask = (idTask) => {
		fetch(`${TODO_DB}/${idTask}`, {
			method: 'DELETE'
		}).then(() => setRefreshTasks(!refreshTasks))
	}

	return {
		requestDeleteTask
	}
}
