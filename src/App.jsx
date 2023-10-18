import { useEffect, useState } from 'react'
import { Button } from './components/Button/Button.jsx'
import { FormAddTask } from './components/FormAddTask/FormAddTask.jsx'
import { ModalWindow } from './components/ModalWindow/ModalWindow.jsx'
import { SearchForm } from './components/SearchForm/SearchForm.jsx'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [refreshTasks, setRefreshTasks] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [, setDebouncedSearchTerm] = useState('')
	const [sortedTodos, setSortedTodos] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState({
		isOpen: false,
		taskValue: '',
		idTask: ''
	})

	const TODO_DB = 'http://localhost:3005/posts'

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

	const requestDeleteTask = (idTask) => {
		fetch(`${TODO_DB}/${idTask}`, {
			method: 'DELETE'
		}).then(() => setRefreshTasks(!refreshTasks))
	}

	const handleClickChangeTask = (idTask, todoTitle) => {
		setIsModalOpen({
			...isModalOpen,
			isOpen: true,
			taskValue: todoTitle,
			idTask: idTask
		})
	}

	const requestChangeTask = () => {
		fetch(`${TODO_DB}/${isModalOpen.idTask}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: isModalOpen.taskValue })
		}).then(() => setRefreshTasks(!refreshTasks))
	}

	const filteredTodos = todos.filter((todo) => {
		return todo.title.toLowerCase().includes(searchValue.toLowerCase())
	})

	const handleSortTasks = (todos) => {
		setSortedTodos(!sortedTodos)

		const sorted = [...todos].sort((a, b) => {
			return sortedTodos
				? b.title.localeCompare(a.title)
				: a.title.localeCompare(b.title)
		})
		setTodos(sorted)
	}

	return (
		<div className="container">
			{isModalOpen.isOpen && (
				<ModalWindow
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					requestChangeTask={requestChangeTask}
				/>
			)}
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
					<div key={todo.id} className="todo_container">
						<p>{todo.title}</p>
						<div className="button_container">
							<Button
								className="change_button"
								onClick={() => handleClickChangeTask(todo.id, todo.title)}
							>
								Change task
							</Button>
							<Button
								className="delete_button"
								onClick={requestDeleteTask}
								inputValue={todo.id}
							>
								Delete task
							</Button>
						</div>
					</div>
				))
			) : (
				<div className="no_tasks">The task list is empty(</div>
			)}
		</div>
	)
}
