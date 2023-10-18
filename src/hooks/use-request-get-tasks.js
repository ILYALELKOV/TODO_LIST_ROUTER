import { useEffect, useState } from 'react'

export const useRequestGetTasks = (setIsLoading, TODO_DB, refreshTasks) => {
	const [todos, setTodos] = useState([])
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
	return {
		todos,
		setTodos
	}
}
