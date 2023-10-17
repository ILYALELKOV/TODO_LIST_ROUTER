import { useEffect, useState } from 'react'
import { Button } from './components/Button/Button.jsx'
import { FormAddTask } from './components/FormAddTask/FormAddTask.jsx'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [refreshTasks, setRefreshTasks] = useState(false)
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

	return (
		<div className="container">
			{isModalOpen.isOpen && (
				<div className="modal">
					<div className="modal-content">
						<h2>Change Task</h2>
						<textarea
							className="text_area_task"
							value={isModalOpen.taskValue}
							onChange={(event) =>
								setIsModalOpen({
									...isModalOpen,
									taskValue: event.target.value
								})
							}
						/>
						<button className="change_button_area" onClick={requestChangeTask}>
							Save changes
						</button>
						<button
							className="close-button"
							onClick={() => setIsModalOpen({ ...isModalOpen, isOpen: false })}
						>
							Close window
						</button>
					</div>
				</div>
			)}
			<h1>TODOS LIST</h1>
			<FormAddTask
				inputValue={inputValue}
				setInputValue={setInputValue}
				onClick={requestAddTask}
			/>
			{isLoading ? (
				<div className="loading">Loading...</div>
			) : todos.length > 0 ? (
				todos.map((todo) => (
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
