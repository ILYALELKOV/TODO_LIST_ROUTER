export const SortTasks = (setSortedTodos, sortedTodos, setTodos) => {
	const handleSortTasks = (todos) => {
		setSortedTodos(!sortedTodos)

		const sorted = [...todos].sort((a, b) => {
			return sortedTodos
				? b.title.localeCompare(a.title)
				: a.title.localeCompare(b.title)
		})
		setTodos(sorted)
	}
	return { handleSortTasks }
}
