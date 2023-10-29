import { useEffect, useState } from 'react'
import { Button } from './components/Button/Button.jsx'
import { FormAddTask } from './components/FormAddTask/FormAddTask.jsx'
import { SearchForm } from './components/SearchForm/SearchForm.jsx'
import { TodoItem } from './components/TodoItem/TodoItem.jsx'
import { useRequestDeleteTask } from './hooks'
import { useRequestAddTask } from './hooks'
import { SortTasks } from './functions'
import { FilteredTodos } from './functions'
import { useRequestClickChangeTask } from './hooks'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [refreshTasks, setRefreshTasks] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [, setDebouncedSearchTerm] = useState('')
	const [sortedTodos, setSortedTodos] = useState(false)

	const TODO_DB = 'http://localhost:3005/task'

	const { handleClickChangeTask } = useRequestClickChangeTask()

	const { requestDeleteTask } = useRequestDeleteTask(
		TODO_DB,
		setRefreshTasks,
		refreshTasks,
		setTodos
	)

	const { requestAddTask } = useRequestAddTask(
		TODO_DB,
		setRefreshTasks,
		refreshTasks,
		setInputValue
	)

	const { handleSortTasks } = SortTasks(setSortedTodos, sortedTodos, setTodos)

	const { filteredTodos } = FilteredTodos(todos, searchValue)

	useEffect(() => {
		setIsLoading(true)
		fetch(TODO_DB)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network error')
				}
				return response.json()
			})
			.then((data) => setTodos(data))
			.catch((error) => console.warn(error))
			.finally(() => setIsLoading(false))
	}, [refreshTasks])

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedSearchTerm(searchValue)
		}, 300)

		return () => {
			clearTimeout(debounceTimeout)
		}
	}, [searchValue])

	return (
		<div className="container">
			<h1>TODOS LIST</h1>
			<FormAddTask
				inputValue={inputValue}
				setInputValue={setInputValue}
				onClick={requestAddTask}
			/>
			<SearchForm
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				todos={todos}
			/>
			<Button
				className={'sort'}
				todos={todos}
				onClick={() => handleSortTasks(todos)}
			>
				Sort todos
			</Button>
			{isLoading ? (
				<div className="loading">Loading...</div>
			) : todos.length > 0 ? (
				filteredTodos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onClickChange={handleClickChangeTask}
						onClickDelete={requestDeleteTask}
					/>
				))
			) : (
				<div className="no_tasks">The task list is empty(</div>
			)}
		</div>
	)
}
