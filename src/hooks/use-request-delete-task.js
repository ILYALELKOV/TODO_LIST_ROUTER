export const useRequestDeleteTask = (
	TODO_DB,
	setRefreshTasks,
	refreshTasks,
	setTodos
) => {
	const requestDeleteTask = (idTask) => {
		fetch(`http://localhost:3005/task/${idTask}`, {
			method: 'DELETE'
		})
			.then(() => fetch(TODO_DB))
			.then((data) => setTodos(data))
			.finally(() => (window.location.href = '/'))
	}

	return {
		requestDeleteTask
	}
}
