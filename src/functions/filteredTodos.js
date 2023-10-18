export const FilteredTodos = (todos, searchValue) => {
	const filteredTodos = todos.filter((todo) => {
		return todo.title.toLowerCase().includes(searchValue.toLowerCase())
	})

	return { filteredTodos }
}
