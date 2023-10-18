export const useRequestAddTask = (
	TODO_DB,
	setRefreshTasks,
	refreshTasks,
	setInputValue
) => {
	const requestAddTask = (task) => {
		event.preventDefault()
		task = task.trim()
		if (task.length > 0) {
			fetch(TODO_DB, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: task })
			})
				.then(() => setRefreshTasks(!refreshTasks))
				.finally(() => setInputValue(''))
		}
	}

	return {
		requestAddTask
	}
}
