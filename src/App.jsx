import { useEffect, useState } from 'react'

export const App = () => {
	const [todos, setTodos] = useState([])
	const TODO_URL = 'https://jsonplaceholder.typicode.com/todos'

	useEffect(() => {
		fetch(TODO_URL)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network error')
				}
				return response.json()
			})
			.then((data) => setTodos(data))
			.catch((error) => console.warn(error))
	}, [])

	return (
		<div className="container">
			<h1>TODOS LIST</h1>
			{todos.map((todo) => (
				<div key={todo.id} className="todo_container">
					<p>{todo.title}</p>
				</div>
			))}
		</div>
	)
}
